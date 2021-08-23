/* eslint-disable no-console */
import chalk from 'chalk';
import mongoose from 'mongoose';

import Config from './config';

export const connectDB = (options = {}, url = Config.DB_URL) =>
  mongoose
    .connect(url, {
      ...options,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    })
    .then((conn) => {
      const connected = chalk.yellowBright('MongoDB Connection established');
      const { host, port, name } = conn.connections[0];
      const conString = chalk.bold(`${name}@${host}:${port}`);
      console.log();
      console.log('>', `${connected} on ${conString}`);
      console.log();
      return conn;
    })
    .catch((e) => console.log('>', chalk.red(`MongoDB Connection error `, e)));
