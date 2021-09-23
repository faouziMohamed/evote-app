import { model, Schema } from 'mongoose';

import Config from '../config/config';

const tokenSchema = new Schema(
  {
    token: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ['activation', 'resetPassword'],
    },
  },
  { timestamps: true },
);
tokenSchema.index({ createdAt: 1 }, { expires: Config.DB_TOKEN_EXPIRY });
const Token = model('Token', tokenSchema);

export default Token;
