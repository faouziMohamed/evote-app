import { model, Schema } from 'mongoose';

import Config from '../config/config';
import { decryptMessage, encryptMessage } from '../utils/lib/aes.utils';

const keysSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    name: { type: String, required: true },
    publicArmoredKey: { type: String, required: true },
    privateArmoredKey: { type: String, required: true },
    passphrase: { type: String, default: '' },
    knownEntities: [{ email: String, publicKey: String }],
  },
  { timeStamp: true },
);

keysSchema.index({ email: 1, _id: 1 }, { unique: true });
// Encrypt passphrase before saving to database
keysSchema.pre('save', function encryptPassPhrase(next) {
  if (this.isModified('passphrase')) {
    const encr = encryptMessage(this.passphrase, Config.PASSPHRASE_KEY);
    this.passphrase = encr.toString();
  }
  next();
});
export const decryptPassphrase = (passphrase) =>
  decryptMessage(passphrase, Config.PASSPHRASE_KEY);

const Keys = model('Keys', keysSchema);
export default Keys;
