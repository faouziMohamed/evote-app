import CreateLogger from 'debug';
import { nanoid } from 'nanoid';

require('dotenv').config();

export const debug = CreateLogger('evote-app: ');
const env = process.env.NODE_ENV || 'production';
const APP_NAME = process.env.APP_NAME || 'E-Vote';
const PORT = Number(process.env.PORT) || 5000;
const BASE_URL =
  env === 'production' ? process.env.BASE_URL : `http://localhost:${PORT}`;

const Config = {
  env,
  session: {
    secret: process.env.SESSION_SECRET || nanoid(1000),
    expiry: Number(process.env.SESSION_EXPIRY) || 15 * 24 * 60 * 60 * 1000, // 15 days
    maxAge: Number(process.env.SESSION_MAXAGE) || 15 * 24 * 60 * 60 * 1000, // 15 days
  },
  DEFAULT_CIN: Number(process.env.DEFAULT_CIN) || 10_000,
  PORT,
  BASE_URL,
  APP_NAME,
  SERVER_NAME: process.env.SERVER_NAME || `${APP_NAME} - Server`,
  SERVER_EMAIL: process.env.SERVER_EMAIL || 'server@pipita.anonaddy.me',
  SERVER_PASSHPRASE: process.env.SERVER_PASSHPRASE || nanoid(100),
  PASSPHRASE_KEY: process.env.PASSPHRASE_KEY || nanoid(100),
  COCENTER_NAME: process.env.COCENTER_NAME || 'Count Center',
  COCENTER_EMAIL: process.env.COCENTER_EMAIL || 'count.server@server.ma',
  COCENTER_PASSHPRASE: process.env.COCENTER_PASSHPRASE || nanoid(100),
  VALCENTER_NAME: process.env.VALIDATION_CENTER_NAME || 'vc Center',
  VALCENTER_EMAIL: process.env.VALIDATION_CENTER_EMAIL || 'vc.server@server.ma',
  VALCENTER_PASSHPRASE: process.env.VALIDATION_CENTER_PASSHPRASE || nanoid(100),
  DB_URL:
    env === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV,
  THEME_COLOR: '#0026a5',
  IMG_DIR_URL: '/images/users',
  USER_IMG_URL: '/images/users/user.png',
  USER_IMG: 'src/public/images/users/user.png',
  IMG_DIR_PATH: 'src/public/images/users',
};
export default Config;
