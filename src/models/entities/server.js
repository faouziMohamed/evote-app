import Config from '../../config/config';
import GPGEncryptor from '../../utils/lib/gpgEncryptor';
import Keys, { decryptPassphrase } from '../keys.model';

const serverData = {
  name: Config.SERVER_NAME,
  email: Config.SERVER_EMAIL,
  passphrase: Config.SERVER_PASSHPRASE,
  userID() {
    return [{ name: this.name, email: this.email }];
  },
};

let serverGPGEncryptor = null;

const getServerKeysFromDB = async (filter = {}) => {
  const key = await Keys.findOne(
    {
      name: serverData.name,
      email: serverData.email,
    },
    filter,
  )
    .lean()
    .exec();
  if (key) key.passphrase = decryptPassphrase(key.passphrase);
  return key;
};

const initServerKey = async () =>
  new GPGEncryptor({
    userIDs: serverData.userID(),
    passphrase: serverData.passphrase,
  }).init();

async function getServerEncryption() {
  const filter = {
    _id: 0,
    publicArmoredKey: 1,
    privateArmoredKey: 1,
    passphrase: 1,
  };
  let serverKeys = await getServerKeysFromDB(filter);
  if (serverKeys) {
    serverGPGEncryptor = await GPGEncryptor.fromArmoredKeys({
      ...serverKeys,
    });
  } else {
    serverGPGEncryptor = await initServerKey();
    serverKeys = serverGPGEncryptor.getArmoredKeys();
    const options = {
      ...serverKeys,
      ...serverGPGEncryptor.userID,
      foreignPubKeys: serverGPGEncryptor.foreignPubKeys,
    };

    await Keys.create(options);
    // eslint-disable-next-line no-console
    console.log('Server keys created!');
  }
  return serverKeys;
}

export const getServerArmoredPublicKey = async () => {
  const serverEnc = await getServerEncryption();
  return serverEnc.publicArmoredKey;
};

export default () => serverGPGEncryptor;
