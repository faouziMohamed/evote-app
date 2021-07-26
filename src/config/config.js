import { config } from 'dotenv';

config();
const env = process.env.NODE_ENV;

const baseConfig = {
  env,
  PORT: process.env.PORT || 3000,
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRY,
    algorithm: 'HS256',
  },
  DB_URL: process.env.DB_URL,
};

export default baseConfig;
