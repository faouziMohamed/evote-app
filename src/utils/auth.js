// import { User } from '_users/users.model';
import jwt from 'jsonwebtoken';

import Config from '../config/config';

export const newToken = (user) => {
  const token = jwt.sign(
    { id: user.id, admin: user.admin, name: user.name },
    Config.jwt.secret,
    {
      algorithm: Config.jwt.algorithm || 'HS256',
      expiresIn: Config.jwt.expiry || '30d',
    },
  );
  return token;
};
