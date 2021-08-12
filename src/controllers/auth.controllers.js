import {
  getAuthErrorMessage,
  getAuthSuccessMessage,
  getPageData,
} from '../data/auth.cms';
import { getMessage } from '../utils/users.utils';
import {
  findUserByCIN,
  findUserByEmail,
  findUserByUsername,
  getUserDataFromRequest,
  hasNoMissingField,
} from './users.controllers';

export const protectRoute = async (req, res, next) => {
  try {
    if (req.user) {
      next();
      return;
    }
    res.status(404).json(getMessage({ reason: 404 }));
  } catch (err) {
    res.status(403).end();
  }
};

const aRequiredFieldIsUsed = async (req, fields) => {
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
    res.status(500).json(err);
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
  if (req.user) {
    return res.redirect('/vote');
  }
  return next();
};

export const loginGET = (req, res) => {
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