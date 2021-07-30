import { config } from 'dotenv';
import { nanoid } from 'nanoid';

config();
const env = process.env.NODE_ENV;

const baseConfig = {
  env,
  PORT: process.env.PORT || 3000,
  session: {
    secret: nanoid(2000),
    expiry: 15 * 24 * 60 * 60 * 1000, // 15 days
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY || '15d', // 15 days,
    algorithm: 'HS256',
  },
  DB_URL: process.env.DB_URL,
};
export default baseConfig;
