import bcrypt from 'bcrypt';
import { startCase, toLower } from 'lodash';
import { model, Schema } from 'mongoose';
import { names, uniqueNamesGenerator as nameGen } from 'unique-names-generator';

const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: [true, 'User name is required'],
      maxLength: [50, 'User name must be less than 50 characters'],
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
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
      return;
    }
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) {
        next(error);
        return;
      }
      user.password = hash;
      next();
    });
  });
});

const makeFieldLowercase = (field, user) => {
  if (user.isModified(field)) {
    return user[field].toLowerCase();
  }
  return user;
};

userSchema.pre('save', function lowerCaseEmail(next) {
  const user = this;
  user.email = makeFieldLowercase('email', user);
  next();
});

userSchema.pre('save', function lowercaseUserName(next) {
  const user = this;
  user.userName = makeFieldLowercase('userName', user);
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

userSchema.methods.comparePassword = function comparePassword(password) {
  const hashedPassword = this.password;
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, isMatch) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(isMatch);
    });
  });
};

const generateName = () =>
  nameGen({
    dictionaries: [names],
    length: 1,
    style: 'lowerCase',
  });

export const newUser = (UserModel) =>
  new UserModel({
    userName: generateName(),
    email: `${generateName()}@glpc.ma`,
    password: '123456789',
    name: {
      first: generateName(),
      last: generateName(),
    },
    birthDate: new Date(),
  });

export const initMockUser = (howMany = 5, UserModel) => {
  for (let i = 0; i < howMany; i++) {
    UserModel.create(newUser(UserModel));
  }
};

export const User = model('User', userSchema);
