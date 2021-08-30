/* eslint-disable no-console */
import { decryptMessage, generateAESKey } from '@lib/aes.utils';
import GPGEncryptor from '@lib/gpgEncryptor';

import { postData } from '../utils/utils';

export class Vote {
  serverPubkey = '';
  coPubkey = '';
  vcPubkey = '';
  ballot = {};
  UID = '';
  #aesKey = '';
  #aesKeyEncrypted = '';
  #userGPGKeys = '';
  #userGPGEncryptor = null;
  static #instance = null;
  constructor({ ballot = { candidateID: -1, UID: -1 }, UID = -1 }) {
    if (!Vote.#instance) {
      this.ballot = ballot;
      this.UID = UID;
      this.#aesKey = generateAESKey(1000);
      Vote.#instance = this;
    }
    return Vote.#instance;
  }

  async initialize() {
    this.serverPubkey = await Vote.#getEntityPublicKey('server');
    this.coPubkey = await Vote.#getEntityPublicKey('countCenter');
    this.vcPubkey = await Vote.#getEntityPublicKey('valCenter');
    await this.#encryptAesKey();
    return this;
  }

  async runVoteProcess() {
    if (!Vote.#instance) throw new Error('Instance Not initialized');
    this.#getUserKeysFromServer().then(this.#makeVote).catch(console.log);
  }

  async #encryptAesKey() {
    this.#aesKeyEncrypted = await GPGEncryptor.encryptMessageStatic({
      message: this.#aesKey,
      armoredEncryptionKey: this.serverPubkey,
    });
  }

  async #getUserKeysFromServer() {
    return postData({
      url: `/api/keys/all/user/id/${this.UID}`,
      data: { expected: this.#aesKeyEncrypted },
    });
  }

  #makeVote = async (encryptedUserGPGkeys) => {
    try {
      const userGPGKeys = this.#decryptUserGPGKeys(encryptedUserGPGkeys.data);
      this.#userGPGEncryptor = await Vote.#createUserGPGEncryptor(userGPGKeys);
      const encryptedBallot = await this.#createEncryptedBallot();
      const { id: voteID } = await this.#getNewVoteID();
      const msg = { voteID, encryptedBallot };
      const coMsg = await this.#prepareMSG(msg, this.coPubkey);
      const vcMsg = await this.#prepareMSG(msg, this.vcPubkey);
      const { data: response } = await postData({
        url: '/api/vote/submit/co',
        data: { vote: coMsg },
      });

      const { data: msgServer } = await postData({
        url: '/api/vote/submit/vc',
        data: { vote: vcMsg },
      });
      console.log('Server Has reponded: ', response, 'then', msgServer);
      return msg;
    } catch (e) {
      return console.log(e);
    }
  };

  #decryptUserGPGKeys(userPGPkeys) {
    const decrypted = decryptMessage(userPGPkeys, this.#aesKey);
    return JSON.parse(decrypted);
  }

  static async #createUserGPGEncryptor(userGPGKeys) {
    return GPGEncryptor.fromArmoredKeys(userGPGKeys);
  }

  async #createEncryptedMsg(msg, armoredPubkey = '', stringify = true) {
    const msgStringified = stringify ? JSON.stringify(msg) : msg;
    const publicKey = await GPGEncryptor.readArmoredPublicKey(armoredPubkey);
    return this.#userGPGEncryptor.encryptMessage(msgStringified, publicKey);
  }

  async #createEncryptedBallot() {
    return this.#createEncryptedMsg(this.ballot, this.vcPubkey);
  }

  async #getNewVoteID() {
    const userPubKey = this.#userGPGEncryptor.getPublicArmoredKey();

    const { data: voteIdEncrypted, error } = await postData({
      url: `/api/vote/voteid?uid=${this.UID}`,
      data: { armoredPublicKey: userPubKey },
    });
    if (error) {
      console.log(error);
      return error;
    }
    const { data } = await this.#userGPGEncryptor.decryptMessage(
      voteIdEncrypted,
    );
    console.log('VOTE ID', data);
    return JSON.parse(data);
  }

  async #prepareMSG(msg, entityPublicKey) {
    const encMSG = await this.#createEncryptedMsg(msg, entityPublicKey);
    return this.#createEncryptedMsg(encMSG, this.serverPubkey, false);
  }

  static async #getEntityPublicKey(entity) {
    const response = await fetch(`/api/keys/public/${entity}`);
    const pubKey = await response.json();
    return pubKey.data;
  }
}
