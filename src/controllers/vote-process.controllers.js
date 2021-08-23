import { EventEmitter } from 'events';

import User from '../models/users.model';
import { findVoteIDById, getNewVoteID } from '../models/voteIDs.model';
import GPGEncryptor from '../utils/lib/gpgEncryptor';
import { getEncryptionKeys } from './entities/index.entities';

export const getEncryptor = async (entity = 'svr') => getEncryptionKeys(entity);
export const voteProcessEvent = new EventEmitter();
async function encryptMsg(armoredPublicKey, encryptor, message) {
  const publicKey = await GPGEncryptor.readArmoredPublicKey(armoredPublicKey);
  const voteIdEncrypted = await encryptor.encryptMessage(message, publicKey);
  return voteIdEncrypted;
}

export async function generateAndSaveVoteID(req) {
  const { armoredPublicKey } = req.body;
  if (!armoredPublicKey) throw new Error('No public key provided');
  const voteID = JSON.stringify({ id: await getNewVoteID(req.user._id) });
  const { entityGPGEncryptor: serverEnc } = await getEncryptionKeys('server');
  const voteIdEncrypted = await encryptMsg(armoredPublicKey, serverEnc, voteID);
  return voteIdEncrypted;
}

export const msgDecryptor = async (encryptor, encryptedMessage) => {
  const { data: decrypted } = await encryptor.decryptMessage(encryptedMessage);
  const decryptedMessage = JSON.parse(decrypted);
  return decryptedMessage;
};

export async function getEncryptedBodyMessage(req) {
  const { vote: voteEncrypted } = req.body;
  if (!voteEncrypted) throw new Error('No vote were provided');
  const { entityGPGEncryptor: serverEnc } = await getEncryptor('server');
  const { data: bodyMessage } = await serverEnc.decryptMessage(voteEncrypted);
  return bodyMessage;
}

async function verifyVoteID(voteID) {
  const id = await findVoteIDById(voteID);
  if (!id)
    throw new Error(
      'Vote ID not found, are you sure that ' +
        "you've followed the vote process correctly?",
    );
}

export async function handleCoUserVerification(userVote, req) {
  const { voteID } = userVote;
  await verifyVoteID(voteID);
  req.session.userVote = userVote;

  voteProcessEvent.once(
    `vote-finished-${req.user.username}`,
    finishVoteProcess,
  );
  return userVote;
}

async function finishVoteProcess(req) {
  req.user = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { hasVoted: true } },
    { new: true },
  )
    .lean()
    .exec();
}
