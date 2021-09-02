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
