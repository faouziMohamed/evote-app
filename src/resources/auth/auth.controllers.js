import { User } from '_users/users.model';
import { validationResult } from 'express-validator';

import { debug } from '../../config/config';
import {
  findOneUser,
  findUserByEmail,
  findUserByUsername,
  getMessage,
  getUserDataFromRequest,
  hasNoMissingField,
} from '../users/users.utils';
import {
  getAuthErrorMessage,
  getAuthSuccessMessage,
  getPageData,
} from './auth.cms';

export const protectRoute = async (req, res, next) => {
  try {
    debug(req.user);
    if (req.user) {
      next();
      return;
    }
    debug('None out there');
    res.status(404).json(getMessage({ reason: 404 }));
  } catch (err) {
    res.status(403).end();
  }
};

const aRequiredFieldIsUsed = async (req, fields) => {
  const { username, email } = fields;
  let userFound = await findUserByUsername(User, username);
  if (userFound) {
    req.flash('error', getAuthErrorMessage('usernameUsed'));
    return true;
  }

  userFound = await findUserByEmail(User, email);
  if (userFound) {
    req.flash('error', getAuthErrorMessage('emailUsed'));
    return true;
  }
  return false;
};

export const registerPOST = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      req.flash('error', getAuthErrorMessage('validation'));
      res.redirect('/register');
      return;
    }

    if (!hasNoMissingField(req.body)) {
      req.flash('error', getAuthErrorMessage('requiredFields'));
      res.redirect('/register');
      return;
    }

    const { username, email, cin } = req.body;
    const user = await findOneUser({ model: User, cin });
    if (!user) {
      req.flash('error', getMessage({ reason: 404 }));
      res.redirect('/register');
      return;
    }

    if (await aRequiredFieldIsUsed(req, { username, email })) {
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
    user.accountActivated = true;
    user.save();

    req.flash('success', getAuthSuccessMessage('activationSuccess'));
    res.redirect('/login');
  } catch (err) {
    res.status(500).end();
  }
};

export const verifyPostingDataMiddleWare =
  (req, res, next) => (err, user, info) => {
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
      return res.redirect('/vote');
    });
  };

export const isAutenticated = (req, res, next) => {
  debug('User is autenticated-----');
  if (req.user) {
    return res.redirect('/vote');
  }
  return next();
};

export const loginGET = (req, res) => {
  debug(req.session);
  debug(req.user);

  const lang = 'en';
  const pageName = 'login';
  const pageData = getPageData(pageName, lang);
  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/login', pageData);
};

export const registerGET = (req, res) => {
  const lang = 'en';
  const pageName = 'register';
  const pageData = getPageData(pageName, lang);
  [pageData.error] = req.flash('error');
  [pageData.success] = req.flash('success');
  res.render('auth/register', pageData);
};
