import { User } from '../models/users.model';
import { sendError, sendSucces } from '../utils/crud';
import { getMessage } from '../utils/users.utils';

export const findUserByEmail = async (email, password = false) =>
  User.findOne({ email }, password && '+password').exec();

export const findUserByUsername = async (username, password = false) =>
  User.findOne({ username }, password && '+password').exec();

export const findUserById = async (id, password = false) =>
  User.findById(id, password && '+password').exec();

export const findUserByCIN = async (cin, password = false) =>
  User.findOne({ cin }, password && '+password').exec();

export const getUserById = async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) {
      return sendError(res, 401, getMessage('uid'));
    }

    const user = await findUserById(id);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }
    return sendSucces(res, 200, user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

export const getOneUserData = async (req, res) => {
  try {
    const { username } = req.params;
    if (!username) {
      return sendError(res, 400, getMessage(400));
    }
    const user = await findUserByUsername(username);
    if (!user) {
      return sendError(res, 404, getMessage({ reason: 404 }));
    }
    return res.status(200).json(user);
  } catch (err) {
    return sendError(res, 400, err.message);
  }
};

export const verifyUserExists = async ({ email, username, cin }) => {
  const user =
    (await findUserByCIN(cin)) ||
    (await findUserByEmail(email)) ||
    (await findUserByUsername(username)) ||
    null;
  if (user && user.accountActivated) {
    return { reason: 403 };
  }
  return null;
};

export function getUserDataFromRequest(req) {
  const {
    username,
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
    username,
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
export function hasNoMissingField(fields) {
  const { username, email, password, birthDate, cin } = fields;

  return (username && cin && email && password && birthDate && true) || false;
}
export const findOneUser = async ({
  id = null,
  cin = null,
  username = null,
  email = null,
  password = false,
}) => {
  const user =
    (id && (await findUserById(id, password))) ||
    (cin && (await findUserByCIN(Number(cin), password))) ||
    (username && (await findUserByUsername(username, password))) ||
    (email && (await findUserByEmail(email, password))) ||
    null;
  return user;
};
