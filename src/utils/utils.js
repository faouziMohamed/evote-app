import bcrypt from 'bcrypt';
import cookie from 'cookie';
import { existsSync } from 'fs';
import path from 'path';

import Config from '../config/config';

export const isBrowser = () =>
  typeof window !== 'undefined' && typeof window.document !== 'undefined';

export function getUserProfilePicture(id) {
  let profilePicture = Config.USER_IMG_URL;
  const imgPath = path.resolve(Config.IMG_DIR_PATH, `${id}`);
  if (existsSync(imgPath)) {
    profilePicture = `${Config.IMG_DIR_URL}/${id}`;
  }
  return profilePicture;
}

export async function hashPassword(password = '') {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function readValueFromCookies(req, cookieName) {
  const c = cookie.parse(req.headers.cookie)?.[cookieName];
  return JSON.parse(c);
}

export function invalidateCookie(res, cookieName) {
  res.cookie(cookieName, {}, { expires: new Date(Date.now() - 1) });
}
