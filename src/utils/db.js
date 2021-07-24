import mongoose from 'mongoose';

import Config from '../config/index';

// Create a function that will be used to connect to the database
export const connectDB = (url = Config.DB_URL, options = {}) =>
  mongoose.connect(url, {
    ...options,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
