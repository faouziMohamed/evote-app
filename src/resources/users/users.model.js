import { startCase, toLower } from 'lodash';
import { model, Schema } from 'mongoose';

import {
  comparePassword,
  encryptPassword,
  lowerCaseEmail,
  makeFieldLowercase,
} from './users.utils';

const userSchema = new Schema(
  {
    userName: {
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
    birthDate: { type: Date, required: true, default: '' },
    isPDG: { type: Boolean, default: false },
    hasVoted: { type: Boolean, default: false },
    hasAccountActivated: { type: Boolean, default: false },
  },
  { timeStamp: true },
);

userSchema.index({ userName: 1, email: 1 }, { unique: true });

userSchema.virtual('userNamePath').get(function userNamePath() {
  const { userName, _id } = this;
  const path = userName || _id;
  return `/users/${path}`;
});

userSchema.virtual('idPath').get(function idPath() {
  // eslint-disable-next-line no-underscore-dangle
  return `/users/${this._id}`;
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

userSchema.pre('save', lowerCaseEmail);

userSchema.pre('save', function capitaliseNames(next) {
  const user = this;
  if (user.isModified('name')) {
    user.name.first = startCase(toLower(user.name.first));
    user.name.last = startCase(toLower(user.name.last));
  }
  next();
});

userSchema.pre('save', function lowercaseUserName(next) {
  const user = this;
  makeFieldLowercase('userName', user);
  next();
});

userSchema.methods.comparePassword = comparePassword;

export const User = model('User', userSchema);
