import passport from 'passport';

import Config from '../config/config';
import { getActivatePageData } from '../data/auth/activate.cms';
import {
  getAuthErrorMessage,
  getAuthSuccessMessage,
} from '../data/auth/auth-msg.cms';
import { getLoginPageData } from '../data/auth/login.cms';
import { getNewPairPageData } from '../data/auth/newPaire.cms';
import {
  createUser,
  existsUserByEmail,
  existsUserByUsername,
} from '../utils/users.utils';
import { readUserData } from './users.controllers';

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
  const pageData = getActivatePageData({
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
  const pageData = getNewPairPageData({
    user: req.user,
    isNewPaire_page: true,
    layout: 'auth/layout',
  });

  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  pageData.user = req.user;
  res.render('auth/new-pair', pageData);
};

export const routeProtecter = (req, res, next) => {
  const freePath = ['/api/users/verify'];
  const isProtectedPath = (path) => freePath.some((p) => !path.startsWith(p));
  let fn = next;
  if (isProtectedPath(req.path)) {
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
  const { isAdmin } = req.user;
  const redirectTo = (path) => res.redirect(path);
  const isAuthPath = (path) => authPath.some((p) => path.startsWith(p));
  const isAdminPath = (path) => adminPath.some((p) => path.startsWith(p));

  let fn = next;
  if (isAuthPath(req.url)) fn = () => redirectTo('/vote');
  else if (!isAdmin && isAdminPath(req.path)) {
    const error = getAuthErrorMessage('onlyAdminAllowed');
    fn = () => res.status(401).json({ error });
  }
  return fn();
}

async function isFieldAlreadyUsed({ username, email }) {
  let userFound = await existsUserByUsername(username);
  if (userFound) return 'usernameUsed';

  userFound = await existsUserByEmail(email);
  if (userFound) return 'emailUsed';
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
        expires: Config.session.expires,
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
