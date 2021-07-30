import { User } from '_users/users.model';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

import Config from '../../config/config';
import { sendError } from '../../utils/crud';
import {
  findOneUser,
  getMessage,
  getUserDataFromRequest,
  verifyRequiredFields,
  verifyUserExists,
} from '../users/users.utils';
import CMSAuth from './auth.cms';

export const newToken = (user) => {
  const token = jwt.sign({ id: user.id }, Config.jwt.secret, {
    expiresIn: Config.jwt.expiry || '30d',
  });
  return token;
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    jwt.verify(token, Config.jwt.secret, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;
  if (!bearer || !bearer.startsWith('Bearer ')) {
    res.status(403).end();
    return;
  }
  try {
    const token = bearer.replace('Bearer ', '');
    const payload = await verifyToken(token);
    const user = await findOneUser({
      model: User,
      id: payload.id,
      password: true,
    });
    if (!user) {
      res.status(404).json(getMessage({ reason: 404 }));
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(403).end();
  }
};
export const signupPOST = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const noMissingField = verifyRequiredFields(req.body);
    if (!noMissingField) {
      return res.status(400).json(getMessage({ reason: 400 }));
    }
    const { userName, email, cin } = req.body;
    const userNameUsed = await verifyUserExists({
      model: User,
      userData: { userName },
    });
    if (userNameUsed) {
      return res.status(400).json(getMessage({ reason: 'userNameUsed' }));
    }

    const emailUsed = await verifyUserExists({
      model: User,
      userData: { email },
    });
    if (emailUsed) {
      return res.status(400).json(getMessage({ reason: 'emailUsed' }));
    }

    const user = await findOneUser({ model: User, cin });
    if (!user) {
      return res.status(404).json(getMessage({ reason: 404 }));
    }

    if (user.accountActivated) {
      return res.status(400).json(getMessage({ reason: 403 }));
    }

    // Update user data
    const userData = getUserDataFromRequest(req);
    Object.keys(userData).forEach((key) => {
      user[key] = userData[key];
    });
    user.accountActivated = true;
    user.save();

    const token = newToken(user);
    res.cookie('jwtAccesToken', token, {
      httpOnly: false,
      secure: Config.env === 'production',
      maxAge: Config.session.maxAge,
      expiry: Config.session.expiry,
      sameSite: true,
    });
    return res.redirect('/dashboard');
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const loginPOST = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json(getMessage({ reason: 400 }));
    }
    const user = await findOneUser({ model: User, userName, password: true });

    if (!user) {
      return res.status(404).json(getMessage({ reason: 404 }));
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return sendError(res, 401, getMessage({ reason: 'passErr' }));
    }
    const token = newToken(user);
    res.cookie('jwtAccesToken', token, {
      httpOnly: false,
      secure: Config.env === 'production',
      maxAge: Config.session.maxAge,
      expiry: Config.session.expiry,
      sameSite: true,
    });
    return res.status(302).redirect('/dashboard');
  } catch (err) {
    return res.json(err);
  }
};

export const loginGET = (req, res) => {
  const lang = 'en';
  res.render('auth/login.ejs', {
    layout: false,
    ...CMSAuth[lang].login,
    ...CMSAuth[lang].meta,
    metadata: {
      title: CMSAuth[lang].login.title,
      description: CMSAuth[lang].login.description,
    },
  });
};

export const signupGET = (req, res) => {
  const lang = 'en';
  res.render('auth/signup.ejs', {
    layout: false,
    ...CMSAuth[lang].signup,
    ...CMSAuth[lang].meta,
    metadata: {
      title: CMSAuth[lang].signup.title,
      description: CMSAuth[lang].signup.description,
    },
  });
};
