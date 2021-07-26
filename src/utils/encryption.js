import openpgp from 'openpgp';

export class MessageEncryption {
  #message = {};

  #messageEncrypted = {};

  #userIDs = [];

  #passphrase = '';

  #privateKey = null;

  #publicKey = null;

  #revocationCertificate = null;

  #instance = null;

  #foreignPubKeys = [''];

  constructor({ message = {}, userIDs = [], passphrase = '' }) {
    if (JSON.stringify(message) === '{}') {
      throw new Error('Message required');
    }
    if (userIDs.length === 0) {
      throw new Error('At least one user ID required');
    }

    this.#message = JSON.stringify(message);
    this.#passphrase = passphrase;
    this.#userIDs = userIDs;
  }

  async init() {
    if (!this.#instance) {
      this.#instance = this;
      await this.generatePairKeys();
      await this.#readArmoredKeys();
      return this;
    }
    throw new Error('Message already initialized');
  }

  async generatePairKeys() {
    const keys = await openpgp.generateKey({
      type: 'rsa',
      rsaBits: 2048,
      userIDs: this.#userIDs,
      curve: 'ed25519',
      passphrase: this.#passphrase,
    });
    this.#privateKey = keys.privateKey;
    this.#publicKey = keys.publicKey;
    this.#revocationCertificate = keys.revocationCertificate;
    return keys;
  }

  async encryptMessage(foreignPubKey = null) {
    if (!foreignPubKey && this.#foreignPubKeys.length === 0) {
      throw new Error('At least one foreign public is key required');
    } else if (this.#foreignPubKeys.indexOf(foreignPubKey) === -1) {
      this.#foreignPubKeys.push(foreignPubKey);
    }

    const message = this.#message;
    const messageObject = await openpgp.createMessage({ text: message });
    return openpgp
      .encrypt({
        message: messageObject,
        encryptionKeys: foreignPubKey,
        signingKeys: this.#privateKey,
      })
      .then((msg) => {
        this.#messageEncrypted = msg;
        return msg;
      });
  }

  async decryptMessage(encryptedMsg) {
    const message = await openpgp.readMessage({ armoredMessage: encryptedMsg });
    return openpgp.decrypt({
      message,
      verificationKeys: this.#publicKey,
      decryptionKeys: this.#privateKey,
    });
  }

  async #readArmoredKeys() {
    const pubKey = await openpgp.readKey({ armoredKey: this.#publicKey });
    const privKey = await openpgp.decryptKey({
      privateKey: await openpgp.readPrivateKey({
        armoredKey: this.#privateKey,
      }),
      passphrase: this.#passphrase,
    });
    this.#publicKey = pubKey;
    this.#privateKey = privKey;
    return { pubKey, privKey };
  }

  getPublicKey() {
    return this.#publicKey;
  }

  getEncryptedMessage() {
    if (this.#instance) {
      return this.#messageEncrypted;
    }
    throw new Error('Message not initialized');
  }
}
