import { generateRandomString } from '../../../utils/lib/aes.utils';
import GPGEncryptor from '../../../utils/lib/gpgEncryptor';
import { decodeCookie, getDataFromCookie, getFullName } from './index';
import {
  ActionButton,
  displayError,
  displayMessage,
  hideLoadSpinner,
} from './utils/new-pair.utils';
import { postData, redirectTo, reloadPage } from './utils/utils';

runOnLoad().catch(displayError);

async function runOnLoad() {
  const btn = new ActionButton({ show: false });

  displayMessage('Fetching data...');
  const { UID, error: cookieErr } = getUIDFromCookie('ps');
  if (cookieErr) {
    btn.updateButton(() => window.location.reload(), 'Reload page', true);
    return displayError(cookieErr);
  }
  const { isDone } = getCookie();
  if (isDone) redirectTo('/vote');
  displayMessage('Establishing communication with the server...');
  const { data: serverArmoredPubKey, error: keyError } = await getServerPubKey(
    '/api/keys/public/server',
  );
  if (keyError) {
    btn.updateButton(() => reloadPage(), 'Reload page', true);
    return displayError(keyError);
  }

  displayMessage('Applying some security things...');
  const URL = `/api/users/id/${UID}?name=true&log_status=true`;
  const { userData, error: userDataError } = await fetchUserData(URL);
  if (userDataError) {
    btn.updateButton(() => redirectTo('/register'), 'Activate account', true);
    return displayError(userDataError);
  }

  displayMessage('Generating encryptions keys...');
  const encryptor = await createNewPairKeys(userData);

  displayMessage(`Almost done...`);
  const encrypted = await encryptGeneratedKeys(encryptor, serverArmoredPubKey);

  displayMessage('Sending data to the server...');
  const { error: postError } = await postData({
    url: `/api/keys/user/id/${UID}`,
    data: { encrypted },
  });

  if (postError) {
    btn.updateButton(() => redirectTo('/login'), 'Go to login page', true);
    return displayError(postError);
  }
  hideLoadSpinner();
  btn.updateButton(() => redirectTo('/vote'), 'Continue', false);
  return displayMessage(`Done!`);
}

function getCookie() {
  return JSON.parse(decodeCookie(getDataFromCookie('ps')));
}

function getUIDFromCookie(cookieName) {
  try {
    const cookie = getDataFromCookie(cookieName);
    if (!cookie) {
      return { error: 'An error occured! Please reload the page to retry!' };
    }
    return { UID: JSON.parse(decodeCookie(cookie)).UID };
  } catch (e) {
    return { error: 'An error occured! Please reload the page to retry!' };
  }
}

async function fetchUserData(URL) {
  return fetch(URL)
    .then(async (res) => {
      const { data, error } = await res.json();
      if (error) return { error };

      const name = getFullName(data.name);
      const email = `${data.email}`;
      const passphrase = generateRandomString(100);
      const userData = { name, email, passphrase };
      return { userData };
    })
    .catch(displayError);
}

async function createNewPairKeys(userData) {
  return new GPGEncryptor({
    userIDs: [{ name: userData.name, email: userData.email }],
    passphrase: userData.passphrase,
  }).init();
}

async function encryptGeneratedKeys(encryptor, serverArmoredPubKey) {
  const unencryptedMessage = JSON.stringify(encryptor.getArmoredKeys());
  const pubKey = await GPGEncryptor.readArmoredPublicKey(serverArmoredPubKey);
  const encrypted = await encryptor.encryptMessage(unencryptedMessage, pubKey);
  return encrypted;
}

async function getServerPubKey(url) {
  const response = await fetch(url);
  return response.json();
}
