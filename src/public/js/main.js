import { generateRandomString } from '../../utils/lib/aes.utils';
import GPGEncryptor from '../../utils/lib/gpgEncryptor';
import { getCandidatesEvent } from './lib/candidates';
import {
  decodeCookie,
  getDataFromCookie,
  handleAutoTypingTexts,
  handleHeaderMenu,
  handleUserVote,
} from './lib/index';

(() => {
  handleHeaderMenu();
  handleUserVote();
  handleAutoTypingTexts();
  getCandidatesEvent();

  const cookie = getDataFromCookie('ps');
  if (!cookie) {
    // eslint-disable-next-line no-console
    console.log('An error occured! Please reload the page to retry');
  }
  const spinerTxt = document.querySelector('.loading-text');
  if (spinerTxt) {
    spinerTxt.innerHTML = 'Fetching data...';
  }
  const { UID } = JSON.parse(decodeCookie(cookie));
  fetch(`/api/users/id/${UID}?name=true&log_status=true`)
    .then((res) => res.json())
    // eslint-disable-next-line promise/always-return
    .then(async (res) => {
      const { data } = res;
      const name = `${data.name.first} ${data.name.last}`;
      const email = `${data.email}`;
      const passphrase = generateRandomString(100);
      spinerTxt.innerHTML = 'Generating encyptions keys...';

      // eslint-disable-next-line no-unused-vars
      const encryptor = await new GPGEncryptor({
        userIDs: [{ name, email }],
        passphrase,
      }).init();
      spinerTxt.innerHTML = 'Making some security things...';
      spinerTxt.innerHTML = 'Initiate comunication with the server...';
      const body = await fetch('/api/keys/public/server');
      const pubkey = await body.json();
      console.log(pubkey);
      spinerTxt.innerHTML = 'Saving setting to server...';
      spinerTxt.innerHTML = 'Done!';
    })
    .catch(() => {});
  // eslint-disable-next-line no-console
  console.log(UID);
})();
