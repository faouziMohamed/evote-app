import { getAuthErrorMessage } from '../data/auth/auth-msg.cms';
import User from '../models/users.model';
import {
  getEmailRegex,
  getNameRegex,
  getUsernameRegex,
  strip,
} from '../public/js/lib/utils/utils';
import { generateRandomString } from '../utils/lib/aes.utils';
import { getNewCin } from '../utils/users.utils';

export async function readUserData(req) {
  const credentials = checkUserInputs(req.body);
  const { isAdmin = false, isCandidate = false } = req.body;
  const [cin, birthDate] = [await getNewCin(User), new Date()];
  const data = { cin, ...credentials, isAdmin, isCandidate, birthDate };
  return data;
}

function checkUserInputs({ username, email, lastname, firstname }) {
  if (!username || !email || !lastname || !firstname) {
    throw new Error(getAuthErrorMessage('missinParams'));
  }

  const usernameLower = username.toLowerCase().trim();
  const emailLower = email.toLowerCase().trim();
  const first = strip(firstname).trim();
  const last = strip(lastname).trim();

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
    password: generateRandomString(8),
  };
}
