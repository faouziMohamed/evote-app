import { getAuthErrorMessage } from '../data/auth/auth-msg.cms';
import {
  getEmailRegex,
  getFullName,
  getUsernameRegex,
} from '../public/js/lib/utils/utils';
import {
  findUserByCIN,
  findUserById,
  findUserByUsername,
} from '../utils/users.utils';
import { findAllUsers } from '../utils/users/users-db.utils';

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
  if (query?.displayable) {
    [
      toKeep.name,
      toKeep.isAdmin,
      toKeep.isCandidate,
      toKeep.accountActivated,
      toKeep.hasVoted,
    ] = [1, 1, 1, 1, 1];
  } else {
    if (query?.name) toKeep.name = 1;
    if (query?.vt_status) toKeep.hasVoted = 1;
    if (query?.log_status) toKeep.isFirstLogin = 1;
    if (query?.utype) toKeep.isCandidate = 1;
    if (query?.acc_status) toKeep.accountActivated = 1;
    if (query?.role) toKeep.isAdmin = 1;
    if (query?.pdg) toKeep.isPdg = 1;
  }
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
      const data = query?.displayable ? user : createDisplayableData(user);
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

function createDisplayableData(user) {
  return {
    id: user._id,
    cin: user.cin,
    username: user.username,
    name: getFullName(user.name),
    email: user.email,
    role: user.isAdmin ? 'admin' : 'user',
    userType: user.isCandidate ? 'candidate' : 'voter',
    hasVoted: user.hasVoted,
    accountActivated: user.accountActivated,
  };
}

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

export function readUserInput({ username, email }) {
  const lowercasedUsername = username?.toLowerCase().trim() || '';
  const lowercasedEmail = email?.toLowerCase().trim() || '';

  const notValid =
    (lowercasedUsername && !getUsernameRegex().test(lowercasedUsername)) ||
    (lowercasedEmail && !getEmailRegex().test(lowercasedEmail));

  if (notValid) {
    const reason = lowercasedUsername ? 'invalidUsername' : 'invalidEmail';
    throw new Error(getAuthErrorMessage(reason));
  }
  return { username: lowercasedUsername, email: lowercasedEmail };
}

export async function getAllUsers(req, res) {
  const { query } = req;
  const toKeep = filterByQueryParameters(query);
  const users = await findAllUsers(toKeep);
  if (!users?.length) {
    return res
      .status(204)
      .json({ error: getAuthErrorMessage('emptyUserList') });
  }
  const data = query?.displayable ? users.map(createDisplayableData) : users;
  return res.status(200).json({ data });
}
