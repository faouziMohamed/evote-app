import cookie from 'cookie';
import passport from 'passport';

import Config from '../config/config';
import { getActivatePageData } from '../data/auth/activate.cms';
import {
  getAuthErrorMessage,
  getAuthSuccessMessage,
} from '../data/auth/auth-msg.cms';
import { getLoginPageData } from '../data/auth/login.cms';
import { getNewPairPageData } from '../data/auth/newPaire.cms';
import { getRegisterPageData } from '../data/auth/register.cms';
import { getUpdateInfoPageData } from '../data/auth/update-info.cms';
import { getToken } from '../utils/token.utils';
import {
  createUser,
  existsUserByEmail,
  existsUserByUsername,
  updateUserById,
} from '../utils/users.utils';
import {
  hashPassword,
  invalidateCookie,
  readValueFromCookies,
} from '../utils/utils';
import {
  readAndValidatePassword,
  readAndvalidateWithRegex,
  readUserData,
} from './users.controllers';

export const loginGET = (req, res) => {
  const pageData = getLoginPageData({ user: req.user, layout: 'auth/layout' });
  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/login', pageData);
};

export const loginPOST = (req, res, next) => {
  const callBack = checkBeforeLogin(req, res, next);
  passport.authenticate('login', callBack)(req, res, next);
};

export const registerGET = (req, res) => {
  const pageData = getRegisterPageData({
    user: req.user,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/register', pageData);
};

export const registerPOST = async (req, res) => {
  try {
    const { username, email } = req.body;
    const alreadyUsed = await isFieldAlreadyUsed({ username, email });
    if (alreadyUsed) {
      req.flash('error', getAuthErrorMessage(alreadyUsed));
      return res.redirect('/register');
    }

    const userData = await readUserData(req, false);
    userData.role = 'admin';
    userData.isActivated = true;
    await createUser(userData);
    req.flash('success', getAuthSuccessMessage('registrationSuccess'));

    return res.redirect('/login');
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const newPairGET = (req, res) => {
  if (!req?.user.isFirstLogin) return res.redirect('/vote');
  const pageData = getNewPairPageData({
    user: req.user,
    isNewPaire_page: true,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  pageData.user = req.user;
  return res.render('auth/new-pair', pageData);
};

export const activateGET = (req, res) => {
  const pageData = getActivatePageData({
    isNewPaire_page: true,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/activate', pageData);
};

export const updateInfoGET = (req, res) => {
  const c = cookie.parse(req.headers.cookie)?.uif;
  if (!c) return res.redirect('/activate');
  const pageData = getUpdateInfoPageData({
    user: req.user,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  return res.render('auth/update-info', pageData);
};

export const updateInfoPOST = async (req, res) => {
  try {
    const uifCookie = readValueFromCookies(req, 'uif');
    const { UID: id, email, tid } = uifCookie;

    if (!id) {
      req.flash('error', getAuthErrorMessage('missingID'));
      return res.redirect('/activate');
    }
    const tokDoc = await getToken({ userId: id, type: 'activation' });

    if (String(tid) !== String(tokDoc._id)) {
      req.flash('error', getAuthErrorMessage('invalidToken'));
      return res.redirect('/activate');
    }
    const userData = readAndvalidateWithRegex({ ...req.body, email });
    const alreadyUsed = await isFieldAlreadyUsed({ ...userData, email: null });
    if (alreadyUsed) {
      const tokUrl = `/api/activate/?token=${tokDoc.token}[${tid}]`;
      req.flash('error', getAuthErrorMessage(alreadyUsed));
      return res.redirect(tokUrl);
    }
    const { password } = readAndValidatePassword(req, false);
    userData.isActivated = true;
    userData.password = await hashPassword(password);
    await updateUserById(id, userData);

    invalidateCookie(res, 'uif');
    req.flash('success', getAuthSuccessMessage('updateSuccess'));
    return res.redirect('/login');
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

export const routeProtecter = (req, res, next) => {
  const freePath = ['/update-info', '/api/users/verify', '/api/activate'];
  const isFreePath = (path) => freePath.some((p) => path.startsWith(p));
  let fn = next;

  if (!isFreePath(req.path)) {
    fn = !req.user
      ? () => useUnprotectedPath(req, res, next)
      : () => useProtectedPath(req, res, next);
  }

  return fn();
};

function useUnprotectedPath(req, res, next) {
  let fn = next;
  const authPath = ['/login', '/activate', '/register'];
  const isAuthPath = (path) => authPath.some((p) => path.startsWith(p));
  if (!isAuthPath(req.path)) fn = () => res.redirect('/login');
  return fn();
}

function useProtectedPath(req, res, next) {
  const authPath = ['/login', '/activate', '/register'];
  const adminPath = ['/admin', '/api/admin'];
  const { role } = req.user;
  const redirectTo = (path) => res.redirect(path);
  const isAuthPath = (path) => authPath.some((p) => path.startsWith(p));
  const isAdminPath = (path) => adminPath.some((p) => path.startsWith(p));
  let fn = next;
  if (isAuthPath(req.url)) fn = () => redirectTo('/vote');
  else if (role !== 'admin' && isAdminPath(req.path)) {
    const error = getAuthErrorMessage('onlyAdminAllowed');
    fn = () => res.status(401).json({ error });
  }
  return fn();
}

async function isFieldAlreadyUsed({ username = '', email = '' }) {
  if (username && (await existsUserByUsername(username))) {
    return 'usernameUsed';
  }

  if (email && (await existsUserByEmail(email))) {
    return 'emailUsed';
  }
  return false;
}

export function checkBeforeLogin(req, res, next) {
  return function logInUser(err, user, info) {
    if (err) return next(err);
    if (!user) {
      handleNoValuesPassed(info, req);
      return res.redirect('/login');
    }

    return req.logIn(user, (error) => {
      if (error) return res.redirect('/login');
      const options = {
        maxAge: Config.session.expiry,
        httpOnly: false,
        secure: false,
      };
      const data = JSON.stringify({ UID: user.id, username: user.username });
      res.cookie('ps', data, options);
      return res.redirect(user.isFirstLogin ? '/new-pair' : '/vote');
    });
  };
}

function handleNoValuesPassed(info, req) {
  if (info) {
    const { username, password } = req.body;
    let message;
    if (!username && !password) {
      message = getAuthErrorMessage('requiredFields');
    } else {
      message = !username
        ? getAuthErrorMessage('username')
        : getAuthErrorMessage('password');
    }
    req.flash('error', message);
  }
}
