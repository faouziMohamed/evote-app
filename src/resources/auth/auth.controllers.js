import { User } from '_users/users.model';
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
    return res.status(401).json(getMessage({ reason: 401 }));
  }

  try {
    const token = bearer.replace('Bearer ', '');
    const payload = await verifyToken(token);
    next();
    const user = await findOneUser({ model: User, id: payload.id });
    if (!user) return res.status(404).end();
    req.user = user;
  } catch (err) {
    return res.status(401).end();
  }
  return next();
};

export const signup = async (req, res) => {
  try {
    const thereIsMissingField = verifyRequiredFields(req.body);
    if (thereIsMissingField) {
      return res.status(400).json(getMessage({ reson: 400 }));
    }

    const userData = getUserDataFromRequest(req);
    const userExists = await verifyUserExists({ model: User, userData });
    if (userExists) {
      return res.status(400).json(getMessage(userExists));
    }

    const user = await User.create(userData);
    const token = newToken(user);
    return res.status(201).json({ token, ...getMessage({ reason: 201 }) });
  } catch (err) {
    return res.status(500).json(getMessage({ reson: 500 }));
  }
};

export const signin = async (req, res) => {
  try {
    const { userName, password, email } = req.body;
    if (!userName || !password || !email) {
      return res.status(400).json(getMessage({ reson: 400 }));
    }
    const user = await findOneUser({ model: User, userName, email });

    if (!user) {
      return res.status(404).json(getMessage({ reson: 404 }));
    }
    const match = await user.comparePassword(password);
    if (!match) {
      return sendError(res, 401, getMessage({ reson: 'passErr' }));
    }
    const token = newToken(user);
    return res.status(200).json({ token, status: 'Connected successfuly' });
  } catch (err) {
    return res.status(500).json(getMessage({ reson: 500 }));
  }
};
