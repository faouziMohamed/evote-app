import { capitalize } from 'lodash';

import { getAuthErrorMessage } from '../data/auth/auth-msg.cms';
import User from '../models/users.model';
import {
  getCINRegex,
  getEmailRegex,
  getFullName,
  getNameRegex,
  getPasswordRegex,
  getUsernameRegex,
  strip,
} from '../public/js/lib/utils/utils';
import { generateRandomString } from '../utils/lib/aes.utils';
import {
  findAllUsers,
  findUserByCIN,
  findUserById,
  findUserByUsername,
  getNewCin,
} from '../utils/users.utils';

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
      toKeep.role,
      toKeep.userType,
      toKeep.isActivated,
      toKeep.hasVoted,
    ] = [1, 1, 1, 1, 1];
  } else {
    if (query?.name) toKeep.name = 1;
    if (query?.vt_status) toKeep.hasVoted = 1;
    if (query?.log_status) toKeep.isFirstLogin = 1;
    if (query?.utype) toKeep.userType = 1;
    if (query?.acc_status) toKeep.isActivated = 1;
    if (query?.role) toKeep.role = 1;
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

      const data = query?.displayable ? createDisplayableData(user) : user;
      return res.status(200).json({ data });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  };
}

export function createDisplayableData(user) {
  return {
    id: user._id,
    cin: user.cin,
    username: user.username,
    name: getFullName(user.name),
    email: user.email,
    role: user.role || 'user',
    userType: user.userType || 'voter',
    hasVoted: user.hasVoted,
    isActivated: user.isActivated,
  };
}

export async function readUserData(req, genPassword = true) {
  const validated = readAndvalidateWithRegex(req.body);
  const { role = 'user', userType = 'voter' } = req.body;
  const { password } = readAndValidatePassword(req, genPassword);
  const [cin, birthDate] = [await getNewCin(User), new Date()];
  const data = { cin, ...validated, role, userType, birthDate, password };
  return data;
}

function readAndvalidateWithRegex({ username, email, lastname, firstname }) {
  if (!username || !email || !lastname || !firstname) {
    throw new Error(getAuthErrorMessage('missinParams'));
  }

  const usernameLower = username.toLowerCase().trim();
  const emailLower = email.toLowerCase().trim();
  const first = capitalize(strip(firstname).trim());
  const last = capitalize(strip(lastname).trim());

  // test regexs
  if (!getUsernameRegex().test(usernameLower)) {
    throw new Error(getAuthErrorMessage('invalidUsername'));
  }
  if (!getEmailRegex().test(emailLower)) {
    throw new Error(getAuthErrorMessage('invalidEmail'));
  }

  if (!getNameRegex().test(first)) {
    throw new Error(getAuthErrorMessage('invalidFirstName'));
  }

  if (!getNameRegex().test(last)) {
    throw new Error(getAuthErrorMessage('invalidLastName'));
  }

  return {
    email: emailLower,
    username: usernameLower,
    name: { first, last },
  };
}
function readAndValidatePassword(req, genPassword) {
  if (genPassword) {
    return { password: generateRandomString(8) };
  }
  const { password } = req.body;
  if (!password) throw new Error(getAuthErrorMessage('missingPassword'));
  if (!getPasswordRegex().test(password)) {
    throw new Error(getAuthErrorMessage('passwordConstraint'));
  }
  return { password };
}

export function readAndVerifyUserInput({ username, email, cin }) {
  const lUsername = username?.toLowerCase().trim() || '';
  const lEmail = email?.toLowerCase().trim() || '';
  const lCin = Number(cin);

  const notValid =
    (lUsername && !getUsernameRegex().test(lUsername)) ||
    (lEmail && !getEmailRegex().test(lEmail)) ||
    (lCin && !getCINRegex().test(lCin));

  if (notValid) {
    const reason = lUsername ? 'invalidUsername' : 'invalidEmail';
    throw new Error(getAuthErrorMessage(reason));
  }
  return { username: lUsername, email: lEmail, cin: lCin };
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
