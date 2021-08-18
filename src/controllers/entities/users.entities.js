/* eslint-disable promise/always-return */
import { getErrorMessage, getSuccessMessage } from '../../data/common.cms';
import Keys, { decryptPassphrase } from '../../models/keys.model';
import User from '../../models/users.model';
import { encryptMessage } from '../../utils/lib/aes.utils';
import { getEncryptionKeys } from './index.entities';

export const getFullName = (name = { first: '', last: '' }) =>
  `${name.first} ${name.last}`;

function areKeysPassedCorrect({
  publicArmoredKey,
  privateArmoredKey,
  passphrase,
}) {
  const msg = { error: false };
  if (!publicArmoredKey && !privateArmoredKey && !passphrase) {
    msg.error = getErrorMessage('noBodyPassed');
  } else if (!publicArmoredKey) {
    msg.error = getErrorMessage('noPubkeyPassed');
  } else if (!privateArmoredKey) {
    msg.error = getErrorMessage('noPrivkeyPassed');
  } else if (!passphrase) {
    msg.error = getErrorMessage('noPassphrasePassed');
  }
  return msg;
}

function checkCredentials(user, { username, cin, id }) {
  const msg = { error: false };
  if (
    (id && id !== user.id) ||
    (username && username !== user.username) ||
    (cin && Number(cin) !== user.cin)
  ) {
    msg.error = getErrorMessage('wrongCredentials');
  }
  return msg;
}

async function getOnlyUserKeys(user, filter = {}) {
  const userKeys = await Keys.findOne({ email: user.email }, filter)
    .lean()
    .exec();
  if (userKeys) {
    userKeys.passphrase = decryptPassphrase(userKeys.passphrase);
  }
  return userKeys;
}

async function decryptReqBodyMsg(msg, toJson = true, entityName = 'server') {
  const { entityGPGEncryptor } = await getEncryptionKeys(entityName);
  const decryptedMessage = await entityGPGEncryptor.decryptMessage(msg);
  return toJson ? JSON.parse(decryptedMessage.data) : decryptedMessage.data;
}

export async function saveUserKeys(req, res) {
  const { user } = req;
  const armoredKeysWithPassphrase = await decryptReqBodyMsg(req.body.encrypted);
  let msg = checkCredentials(user, req.params);
  if (msg.error) {
    return res.status(400).json({ error: msg.error });
  }

  msg = areKeysPassedCorrect(armoredKeysWithPassphrase);
  if (msg.error) {
    return res.status(400).json({ error: msg.error });
  }

  const name = getFullName(user.name);
  const { email } = user;
  const keys = new Keys({
    email,
    name,
    ...armoredKeysWithPassphrase,
  });

  req.user = await User.findByIdAndUpdate(
    user.id,
    { $set: { isFirstLogin: false } },
    { new: true },
  )
    .lean()
    .exec();

  return keys
    .save()
    .then(() =>
      res.status(201).json({ success: getSuccessMessage('keysSaved') }),
    )
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(302).json({
          error:
            'Error 11000, contact an administrator for more details.\n Insisting with operation will make your account locked',
        });
      }
      return res.status(500).json({ error: err });
    });
}

export async function getKeys(req, res) {
  const { user } = req;
  const { expected: aesKeyEncrypted } = req.body; // expected is a aesKey
  const msg = checkCredentials(user, req.params);

  if (msg.error) {
    return res.status(400).json({ error: msg.error });
  }

  if (!aesKeyEncrypted) {
    return res
      .status(400)
      .json({ error: getErrorMessage('noEncryptKeyPassed') });
  }
  const filter = { _id: 0, __v: 0, email: 0, name: 0 };
  const keys = await getOnlyUserKeys(user, filter);
  if (!keys) {
    return res.status(204).end();
  }
  const keysString = JSON.stringify(keys);
  const aesKey = await decryptReqBodyMsg(aesKeyEncrypted, false);
  const encrypted = encryptMessage(keysString, aesKey);
  return res.status(200).json({ data: encrypted.toString() });
}
