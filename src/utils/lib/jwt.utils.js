import { sign, verify } from 'jsonwebtoken';

import Config from '../../config/config';

export const newToken = (user) => {
  const { secret, expiry } = Config.jwt;
  const token = sign({ id: user._id }, secret, {
    expiresIn: expiry,
  });
  return token;
};

export const verifyToken = (token) =>
  new Promise((resolve, reject) => {
    verify(token, Config.jwt.secret, (err, payload) => {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
