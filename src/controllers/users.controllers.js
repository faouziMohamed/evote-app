import { getAuthErrorMessage } from '../data/auth/auth-msg.cms';
import User from '../models/users.model';

export const findUserByEmail = async (email, filter = {}, password = false) =>
  User.findOne({ email }, password && '+password')
    .select(filter)
    .exec();

export const findUserByUsername = async (
  username,
  filter = {},
  password = false,
) =>
  User.findOne({ username }, password && '+password')
    .select(filter)
    .exec();

export const findUserById = async (id, filter = {}, password = false) =>
  User.findById(id, password && '+password')
    .select(filter)
    .exec();

export const findUserByCIN = async (cin, filter = {}, password = false) =>
  User.findOne({ cin }, password && '+password')
    .select(filter)
    .exec();

export const getUserByUsername = async (req, res, filter = {}) => {
  try {
    const { username } = req.params;
    if (!username) {
      return () =>
        res.status(400).json({ error: getAuthErrorMessage('missingUsername') });
    }
    return findUserByUsername(username, filter);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

export const getUserActivatedCount = async () =>
  User.find({ accountActivated: true }).countDocuments().exec();

export const getUserByID = async (req, res, filter = {}) => {
  try {
    const { id } = req.params;
    if (!id) {
      return () =>
        res.status(400).json({ error: getAuthErrorMessage('missingID') });
    }
    return findUserById(id, filter);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
export const getUserByCIN = async (req, res, filter = {}) => {
  try {
    const { cin } = req.params;
    if (!cin) {
      return () =>
        res.status(400).json({ error: getAuthErrorMessage('missingID') });
    }
    return findUserByCIN(cin, filter);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

function filterByQueryParameters(query) {
  const toKeep = { username: 1, email: 1, cin: 1 };
  if (query.name) toKeep.name = 1;
  if (query.vt_status) toKeep.hasVoted = 1;
  if (query.log_status) toKeep.isFirstLogin = 1;
  if (query.utype) toKeep.isCandidate = 1;
  if (query.acc_status) toKeep.accountActivated = 1;
  if (query.role) toKeep.isAdmin = 1;
  if (query.pdg) toKeep.isPdg = 1;
  return toKeep;
}

export function getUserWithCallback(userFinderCB) {
  return async (req, res) => {
    try {
      const { query } = req;
      const toKeep = filterByQueryParameters(query);
      const user = await userFinderCB(req, res, toKeep);
      if (!user) {
        return res
          .status(404)
          .json({ error: getAuthErrorMessage('userNotFound') });
      }
      if (typeof user === 'function') {
        return user();
      }
      return res.status(200).json({ data: user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

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
