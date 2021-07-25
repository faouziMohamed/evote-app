import bcrypt from 'bcrypt';
import { names, uniqueNamesGenerator as nameGen } from 'unique-names-generator';

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

export const addRandomUserToDB = (howMany = 5, UserModel) => {
  for (let i = 0; i < howMany; i++) {
    UserModel.create(newUser(UserModel));
  }
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
export const getOneUser = async (
  model,
  id = null,
  userName = null,
  email = null,
) => {
  const user =
    (id && (await findUserById(model, id))) ||
    (userName && (await findUserByUsername(model, userName))) ||
    (email && (await findUserByEmail(model, email)));
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
    isPDG,
    birthDate,
    hasAccountActivated,
    firstName,
    lastName,
  } = req.body;

  const userData = {
    userName,
    email,
    password,
    name: { first: firstName, last: lastName },
    birthDate,
    isPDG: isPDG || false,
    hasAccountActivated: hasAccountActivated || false,
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
  404: 'User not found',
  400: 'Missing parameters',
  403: 'User already activated',
};
export const getMessage = ({ reason }) => message[reason] || 'Unexpected error';

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
