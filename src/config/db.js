import mongoose from 'mongoose';

import Config from './config';

export const connectDB = (options = {}, url = Config.DB_URL) =>
  mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
