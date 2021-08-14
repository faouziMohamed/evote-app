import { generateRandomString } from '../../../utils/lib/aes.utils';
import GPGEncryptor from '../../../utils/lib/gpgEncryptor';
import { decodeCookie, getDataFromCookie, getFullName } from './index';

(async () => {
  displayMessage('Fetching data...');
  const cookie = getDataFromCookie('ps');
  if (!cookie) {
    return displayError('An error occured! Please reload the page to retry!');
  }

  const { UID } = JSON.parse(decodeCookie(cookie));

  displayMessage('Establishing communication with the server...');
  const { data: serverArmoredPubKey, error: keyError } = await getServerPubKey(
    '/api/keys/public/server',
  );
  if (keyError) return displayError(keyError);

  displayMessage('Applying some security things...');
  const { userData, error: userDataError } = await fetchUserData(UID);
  if (userDataError) return displayError(userDataError);

  displayMessage('Generating encryptions keys...');
  const encryptor = await createNewPairKeys(userData);

  displayMessage(`Almost done...`);
  const encrypted = await encryptGeneratedKeys(encryptor, serverArmoredPubKey);

  displayMessage('Sending data to the server...');
  const { error: postError } = await postData({
    url: `/api/keys/user/id/${UID}`,
    data: { encrypted },
  });

  if (postError) return displayError(postError);
  return displayMessage(`Done!`);
})();

async function fetchUserData(UID) {
  return fetch(`/api/users/id/${UID}?name=true&log_status=true`)
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

async function postData({ url = '', data = {}, stringify = true }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: stringify ? JSON.stringify(data) : data,
  });
  return response.json();
}

async function getServerPubKey(url) {
  const response = await fetch(url);
  return response.json();
}

function hideLoadSpinner(
  loadSpinner = document.querySelector('.load-spinner'),
) {
  if (loadSpinner) loadSpinner.classList.add('hidden');
}

function displayMessage(
  message,
  type = 'success',
  spinerTxt = document.querySelector('.loading-text'),
) {
  if (spinerTxt) {
    if (type === 'error') spinerTxt.classList.add('error-msg');
    if (type === 'warning') spinerTxt.classList.add('warning-msg');
    spinerTxt.innerHTML = message;
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Cannot display message');
}
function displayError(error, type = 'error') {
  displayMessage(`${type === 'error' ? 'error' : 'warning'}: ${error}`, type);
  hideLoadSpinner();
}
