import { merge } from 'lodash';

import envConfig from './dev';

const env = process.env.NODE_ENV || 'development';

const baseConfig = {
  env,
  isDev: env === 'development',
  port: process.env.PORT || 3000,
};

export default merge(baseConfig, envConfig);
