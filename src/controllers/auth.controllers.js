import Config from '../config/config';
import {
  getAuthErrorMessage,
  getAuthSuccessMessage,
} from '../data/auth/auth-msg.cms';
import { getLoginPageData } from '../data/auth/login.cms';
import { getRegisterPageData } from '../data/auth/register.cms';
import {
  findUserByCIN,
  findUserByEmail,
  findUserByUsername,
  getUserActivatedCount,
} from '../utils/users.utils';
import { getUserDataFromRequest, hasNoMissingField } from './users.controllers';

export const checkAuthentication = (req, res, next) => {
  if (req.url === '/login' || req.url === '/register') {
    if (req.user) {
      return res.status(307).redirect('/vote');
    }
  } else if (!req.user) {
    req.flash('error', getAuthErrorMessage('needToLogin'));
    return res.status(307).redirect('/login');
  }
  return next();
};

export const protectAPIRoute = async (req, res, next) => {
  try {
    if (req.user) {
      next();
      return;
    }
    res.status(403).json(getAuthErrorMessage('needToLoginAPI'));
  } catch (err) {
    res.status(403).end();
  }
};

const fieldAlreadyUsed = async (req, fields) => {
  const { username, email } = fields;
  let userFound = await findUserByUsername(username);
  if (userFound) {
    req.flash('error', getAuthErrorMessage('usernameUsed'));
    return true;
  }

  userFound = await findUserByEmail(email);
  if (userFound) {
    req.flash('error', getAuthErrorMessage('emailUsed'));
    return true;
  }
  return false;
};

export const registerPOST = async (req, res) => {
  try {
    if (!hasNoMissingField(req.body)) {
      req.flash('error', getAuthErrorMessage('requiredFields'));
      res.redirect('/register');
      return;
    }

    const { username, email, cin } = req.body;
    const user = await findUserByCIN(cin);
    if (!user) {
      req.flash('error', getAuthErrorMessage('userNotFound'));
      res.redirect('/register');
      return;
    }

    if (await fieldAlreadyUsed(req, { username, email })) {
      res.redirect('/register');
      return;
    }

    if (user.accountActivated) {
      req.flash('error', getAuthErrorMessage('accountAlreadyActivated'));
      res.redirect('/register');
      return;
    }

    // Update user data
    const userData = getUserDataFromRequest(req);
    Object.keys(userData).forEach((key) => {
      user[key] = userData[key];
    });
    const activatonOrderNo = await getUserActivatedCount();
    user.activationOrderNo = activatonOrderNo + 1;
    user.accountActivated = true;
    user.save();

    req.flash('success', getAuthSuccessMessage('activationSuccess'));
    res.redirect('/login');
  } catch (err) {
    res.status(500).json(err);
  }
};

export const checkBeforeLogin = (req, res, next) => (err, user, info) => {
  if (err) {
    return next(err);
  }
  if (!user) {
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

export const isAutenticated = (req, res, next) => {
  if (req.user) {
    return res.redirect('/vote');
  }
  return next();
};

export const loginGET = (req, res) => {
  const pageData = getLoginPageData({ user: req.user, layout: 'auth/layout' });
  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/login', pageData);
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
