import bcrypt from 'bcrypt';
import { names, uniqueNamesGenerator as nameGen } from 'unique-names-generator';

import BaseConfig from '../../config/config';
import CandidatesModel from '../candidates/candidates.model';

export class StaticData {
  static cin = Number(10000);
  static numberUserAdded = Number(0);
  static numberCandidateAdded = Number(0);

  static get candidateNumber() {
    return this.numberCandidateAdded;
  }

  static incNumberCandidateAdded() {
    this.numberCandidateAdded += 1;
    return this.numberCandidateAdded;
  }

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
  const numberCandidate = StaticData.candidateNumber;
  const isTrue = Math.round(Math.random() * 10) % 2 === 0;
  const addACandidate = numberCandidate < 20 && isTrue;
  if (addACandidate) StaticData.incNumberCandidateAdded();

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
    isCandidate: addACandidate,
  });
  try {
    UserModel.create(user);
    StaticData.incrementNumberAdded();
    if (addACandidate) {
      // eslint-disable-next-line no-underscore-dangle
      const u = CandidatesModel.create({ cin: user.cin });
      // eslint-disable-next-line no-console
      console.log(`User ${u} added a candidate`);
    }
    return user;
  } catch (err) {
    return null;
  }
};
export const addRandomUserToDB = async (howMany = 5, UserModel) => {
  const users = await UserModel.find({}).sort({ cin: -1 }).limit(1).exec();
  const cin = (users.length && users[0].cin + 1) || StaticData.getNewCin();
  StaticData.setCin(cin);
  let user;
  // eslint-disable-next-line no-console
  console.log(StaticData.getNumberUserAdded());
  for (let i = 0; i < howMany; i++) {
    user = newUser(UserModel);
    if (!user) return !1;
    if (BaseConfig.env === 'development') {
      // eslint-disable-next-line no-console
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

export const findUserByEmail = async (model, email, password) =>
  model.findOne({ email }, password && '+password').exec();

export const findUserByUsername = async (model, userName, password) =>
  model.findOne({ userName }, password && '+password').exec();

export const findUserById = async (model, id, password) =>
  model.findById(id, password && '+password').exec();

export const findUserByCIN = async (model, cin, password) =>
  model.findOne({ cin }, password && '+password').exec();

// Get user document from the database using it username or userId
export const findOneUser = async ({
  model,
  id = null,
  cin = null,
  userName = null,
  email = null,
  password = false,
}) => {
  const user =
    (id && (await findUserById(model, id, password))) ||
    (cin && (await findUserByCIN(model, cin, password))) ||
    (userName && (await findUserByUsername(model, userName, password))) ||
    (email && (await findUserByEmail(model, email, password))) ||
    null;
  return user;
};

export function verifyRequiredFields(fields) {
  const { userName, email, password, birthDate, cin } = fields;

  return (userName && cin && email && password && birthDate && true) || false;
}

export function getUserDataFromRequest(req) {
  const {
    userName,
    email,
    cin,
    password,
    isPdg,
    isAdmin,
    birthDate,
    hasVoted,
    accountActivated,
  } = req.body;

  const userData = {
    userName,
    email,
    password,
    cin,
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
  403: 'User account already activated',
  500: 'Internal server error',
};
export const getMessage = ({ reason }) =>
  ({ message: message[reason] } || 'Unexpected error');

export const verifyUserExists = async ({ model, userData }) => {
  const { email, userName, cin } = userData;

  const user =
    (await findUserByCIN(model, cin)) ||
    (await findUserByEmail(model, email)) ||
    (await findUserByUsername(model, userName)) ||
    null;
  if (user && user.accountActivated) {
    return { reason: 403 };
  }
  return null;
};
