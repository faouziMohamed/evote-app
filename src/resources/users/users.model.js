import bcrypt from 'bcrypt';
import { startCase, toLower } from 'lodash';
import { model, Schema } from 'mongoose';

import { encryptPassword } from './users.utils';

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'User name is required'],
      maxLength: [50, 'User name must be less than 50 characters, got {VALUE}'],
      default: '',
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
      default: '',
    },
    password: {
      type: String,
      required: [true, 'Password is required and must be at last 8 caracters'],
      minLength: [8, 'Password must be at least 8 characters'],
      select: false,
      default: '',
    },
    name: {
      first: {
        type: String,
        required: true,
        default: '',
        minLength: [2, 'First name must be at least 2 characters'],
        maxLength: [100, 'First name must be less than 100 characters'],
      },
      last: {
        type: String,
        required: true,
        default: '',
        minLength: [2, 'Last name must be at least 2 characters'],
        maxLength: [100, 'Last name must be less than 100 characters'],
      },
    },
    cin: {
      type: Number,
      required: [true, 'CIN is required but nothing was specified'],
      unique: true,
    },
    birthDate: { type: Date, required: true, default: '' },
    isPdg: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isCandidate: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    accountActivated: { type: Boolean, default: false },
  },
  { timeStamp: true },
);

userSchema.index({ username: 1, email: 1 }, { unique: true });

userSchema.virtual('usernamePath').get(function usernamePath() {
  const { username, _id } = this;
  const path = username || _id;
  return `/user/${path}`;
});

userSchema.virtual('idPath').get(function idPath() {
  return `/user/${this._id}`;
});

// Everytime a user is saved or the password is changed, hash the password
userSchema.pre('save', function hashPassword(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
    return;
  }
  encryptPassword(next, user);
});

userSchema.pre('save', async function lowerCaseEmail(next) {
  const user = this;
  const { email } = user;
  user.set({ email: email.toLowerCase() });
  next();
});

userSchema.pre('save', function capitaliseNames(next) {
  const user = this;
  if (user.isModified('name')) {
    user.name.first = startCase(toLower(user.name.first));
    user.name.last = startCase(toLower(user.name.last));
  }
  next();
});

userSchema.pre('save', function lowercaseusername(next) {
  const user = this;
  if (user.isModified('username')) {
    user.username.toLowerCase();
  }
  next();
});

userSchema.methods.comparePassword = async function comparePassword(password) {
  const hashedPassword = this.password;
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
export const User = model('User', userSchema);
