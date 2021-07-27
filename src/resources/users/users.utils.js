import bcrypt from 'bcrypt';
import { names, uniqueNamesGenerator as nameGen } from 'unique-names-generator';

import BaseConfig from '../../config/config';

export class StaticData {
  static cin = Number(10000);
  static numberUserAdded = Number(0);
  static getNewCin() {
    // eslint-disable-next-line no-plusplus
    return this.cin++;
  }

  static setCin(cin) {
    this.cin = cin;
    this.setNumberUserAdded(cin);
  }

  static setNumberUserAdded(numberUserAdded) {
    this.numberUserAdded = numberUserAdded;
  }

  static incrementNumberAdded() {
    // eslint-disable-next-line no-plusplus
    this.numberUserAdded++;
  }

  static getNumberUserAdded() {
    return this.numberUserAdded;
  }
}

const generateName = () =>
  nameGen({
    dictionaries: [names],
    length: 1,
    style: 'lowerCase',
  });

export const newUser = (UserModel) => {
  const user = new UserModel({
    userName: generateName(),
    email: `${generateName()}@${generateName()}-glpc.ma`,
    password: '123456789',
    name: {
      first: generateName(),
      last: generateName(),
    },
    cin: StaticData.getNewCin(),
    birthDate: new Date(),
  });
  try {
    UserModel.create(user);
    StaticData.incrementNumberAdded();
    return user;
  } catch (err) {
    return null;
  }
};

export const addRandomUserToDB = async (howMany = 5, UserModel) => {
  const users = await UserModel.find({}).sort({ cin: -1 }).limit(1).exec();
  const _ = users.length && StaticData.setCin(users[0].cin + 1);
  let user;
  // eslint-disable-next-line no-console
  console.log(StaticData.getNumberUserAdded());
  for (let i = 0; i < howMany; i++) {
    user = newUser(UserModel);
    if (!user) return !1;
    if (BaseConfig.env === 'development') {
      console.log(`User ${StaticData.getNumberUserAdded()} added`);
    }
  }
  return true;
};

export const makeFieldLowercase = (field, document) => {
  if (document.isModified(field)) {
    return document[field].toLowerCase();
  }
  return document;
};

export async function lowerCaseEmail(next) {
  const user = this;
  const { email } = user;
  user.set({ email: email.toLowerCase() });
  next();
}

export function encryptPassword(next, user) {
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
      user.set({ password: hash });
      next();
    });
  });
}

export function comparePassword(password) {
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
}

export const findUserByEmail = async (model, email) =>
  model.findOne({ email }).exec();

export const findUserByUsername = async (model, userName) =>
  model.findOne({ userName }).exec();

export const findUserById = async (model, id) =>
  model.findOne({ _id: id }).exec();

// Get user document from the database using it username or userId
export const findOneUser = async ({
  model,
  id = null,
  userName = null,
  email = null,
}) => {
  const user =
    (id && (await findUserById(model, id))) ||
    (userName && (await findUserByUsername(model, userName))) ||
    (email && (await findUserByEmail(model, email))) ||
    null;
  return user;
};

export function verifyRequiredFields(fields) {
  const { userName, email, password, birthDate, firstName, lastName } = fields;
  return (
    !userName || !email || !password || !birthDate || !firstName || !lastName
  );
}

export function getUserDataFromRequest(req) {
  const {
    userName,
    email,
    password,
    isPdg,
    isAdmin,
    birthDate,
    hasVoted,
    firstName,
    lastName,
    accountActivated,
  } = req.body;

  const userData = {
    userName,
    email,
    password,
    name: { first: firstName, last: lastName },
    birthDate,
    isPdg: isPdg || false,
    isAdmin: isAdmin || false,
    hasVoted: hasVoted || false,
    accountActivated: accountActivated || false,
  };
  return userData;
}

const message = {
  uidRqd: 'Missing parameters, user id is required to activate the account',
  uid: 'Missing parameters, user id is required',
  activated: 'Account activated',
  nactivated: 'Account created but not activated',
  emailUsed: 'The email is already used',
  userNameUsed: 'The user name is already used',
  fieldsRqd: 'Missing parameters, some fields are required',
  passErr: 'Incorrect Password',
  201: 'Account created but not activated',
  404: 'User not found',
  401: 'Connect and retry the operation',
  400: 'Missing parameters',
  403: 'User already activated',
  500: 'Internal server error',
};
export const getMessage = ({ reason }) =>
  ({ message: message[reason] } || 'Unexpected error');

export const verifyUserExists = async ({ model, userData }) => {
  const { email, userName } = userData;

  let user = await findUserByEmail(model, email);
  if (user) {
    return { reason: 'emailUsed' };
  }
  user = await findUserByUsername(model, userName);
  if (user) {
    return { reason: 'userNameUsed' };
  }
  return null;
};
