import Debug from 'debug';
import { nanoid } from 'nanoid';

require('dotenv').config();

export const debug = Debug('votes:server');
const env = process.env.NODE_ENV || 'production';
const APP_NAME = process.env.APP_NAME || 'E-Votes';

const Config = {
  env,
  session: {
    secret: process.env.SESSION_SECRET || nanoid(1000),
    expiry: Number(process.env.SESSION_EXPIRY) || 15 * 24 * 60 * 60 * 1000, // 15 days
    maxAge: Number(process.env.SESSION_MAXAGE) || 15 * 24 * 60 * 60 * 1000, // 15 days
  },
  PORT: Number(process.env.PORT) || 5000,
  APP_NAME,
  SERVER_NAME: process.env.SERVER_NAME || `${APP_NAME} - Server`,
  SERVER_EMAIL: process.env.SERVER_EMAIL || 'server@pipita.anonaddy.me',
  SERVER_PASSHPRASE: process.env.SERVER_PASSHPRASE || nanoid(1000),
  PASSPHRASE_KEY: process.env.PASSPHRASE_KEY || nanoid(1000),
  DB_URL:
    env === 'production' ? process.env.DB_URL_PROD : process.env.DB_URL_DEV,
};
export default Config;
