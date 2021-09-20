"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _openpgp = require("openpgp");

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _userIDs = /*#__PURE__*/new WeakMap();

var _passphrase = /*#__PURE__*/new WeakMap();

var _privateKey = /*#__PURE__*/new WeakMap();

var _publicKey = /*#__PURE__*/new WeakMap();

var _revocationCertificate = /*#__PURE__*/new WeakMap();

var _instance = /*#__PURE__*/new WeakMap();

var _foreignPubKeys = /*#__PURE__*/new WeakMap();

var _generateKey = /*#__PURE__*/new WeakSet();

var _getPrivateKey = /*#__PURE__*/new WeakSet();

/**
 * Class for encrypting and decrypting messages with GPG.
 * Main algotihme use the asymetric encryption. By default, the asymetric
 * encryption used is `ecc` algorithm.
 * - You have the choix to use static methods to encrypt and decrypt messages
 * - or use instance methods to encrypt and decrypt messages
 */
var GPGEncryptor = /*#__PURE__*/function () {
  /**
   * @param {Array} userIDs : Array of user IDs containing name and email
   * @param {string} passphrase : Passphrase for the private key
   * @return Promise<MessageEncryption>
   */
  function GPGEncryptor(_ref) {
    var _ref$userIDs = _ref.userIDs,
        userIDs = _ref$userIDs === void 0 ? [] : _ref$userIDs,
        _ref$passphrase = _ref.passphrase,
        passphrase = _ref$passphrase === void 0 ? '' : _ref$passphrase;
    (0, _classCallCheck2["default"])(this, GPGEncryptor);

    _getPrivateKey.add(this);

    _generateKey.add(this);

    _userIDs.set(this, {
      writable: true,
      value: [{}]
    });

    _passphrase.set(this, {
      writable: true,
      value: ''
    });

    _privateKey.set(this, {
      writable: true,
      value: ''
    });

    _publicKey.set(this, {
      writable: true,
      value: ''
    });

    _revocationCertificate.set(this, {
      writable: true,
      value: ''
    });

    _instance.set(this, {
      writable: true,
      value: null
    });

    _foreignPubKeys.set(this, {
      writable: true,
      value: ['']
    });

    if (userIDs.length === 0) {
      throw new Error('At least one user ID required');
    }

    (0, _classPrivateFieldSet2["default"])(this, _passphrase, passphrase);
    (0, _classPrivateFieldSet2["default"])(this, _userIDs, userIDs);
  }
  /**
   * @async <br>
   * Initialize an object after it instantiation
   * - Generate a pair of keys
   * - Make them ready to encrypt and decrypt message
   * - Return the same instance with the keys ready to use
   * @return Promise<MessageEncryption>
   * */


  (0, _createClass2["default"])(GPGEncryptor, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if ((0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context.next = 5;
                  break;
                }

                (0, _classPrivateFieldSet2["default"])(this, _instance, this);
                _context.next = 4;
                return this.generateAsymetricKeys();

              case 4:
                return _context.abrupt("return", this);

              case 5:
                throw new Error('Message already initialized');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _init.apply(this, arguments);
      }

      return init;
    }()
    /**
     * Set all calculated field to non initialized state.
     * User will need to call the `.init()` method to initialize the object
     * before using it.
     * <br>
     * UserIDs and passphrase will remain unchanged. We recommend to create new
     * instance of the class if you need to change them.
     *
     */

  }, {
    key: "reset",
    value: function reset() {
      (0, _classPrivateFieldSet2["default"])(this, _instance, null);
      (0, _classPrivateFieldSet2["default"])(this, _publicKey, null);
      (0, _classPrivateFieldSet2["default"])(this, _privateKey, null);
      (0, _classPrivateFieldSet2["default"])(this, _foreignPubKeys, ['']);
    }
  }, {
    key: "generateAsymetricKeys",
    value:
    /**
     * @async <br>
     * Generate public in Object format and armored format key with using the parameters
     * passed in the constructor.
     * */
    function () {
      var _generateAsymetricKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var keys;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _classPrivateMethodGet(this, _generateKey, _generateKey2).call(this, 'ecc');

              case 2:
                keys = _context2.sent;
                (0, _classPrivateFieldSet2["default"])(this, _privateKey, keys.privateKey);
                (0, _classPrivateFieldSet2["default"])(this, _publicKey, keys.publicKey);
                (0, _classPrivateFieldSet2["default"])(this, _revocationCertificate, keys.revocationCertificate);
                return _context2.abrupt("return", this.getPublicKeyBoth());

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function generateAsymetricKeys() {
        return _generateAsymetricKeys.apply(this, arguments);
      }

      return generateAsymetricKeys;
    }()
    /**
     * @static, @async <br>
     * Generate public and private key with the given IDs and return the keys
     * as an object. Keys are in then `openpgp.key` format.
     * @param {Array} userIDs : Array of user IDs containing name and email
     * @param {string} passphrase : Passphrase for the private key
     * @return Promise<Object>
     *  */

  }, {
    key: "encryptMessage",
    value:
    /** Encrypt a message with the public key passed in parameter sign the
     * encrypted message with the private key of the current instance
     * @param {string} message : The message to encrypt
     * @param {string} pubKey : The public key to encrypt the message with
     * @return Promise<string>
     * */
    function () {
      var _encryptMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(message, encryptionKey) {
        var messageObject;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, message, 'Message to encrypt');

                if ((0, _classPrivateFieldGet2["default"])(this, _foreignPubKeys).indexOf(encryptionKey) === -1) {
                  (0, _classPrivateFieldGet2["default"])(this, _foreignPubKeys).push(encryptionKey);
                }

                _context3.next = 4;
                return (0, _openpgp.createMessage)({
                  text: message
                });

              case 4:
                messageObject = _context3.sent;
                _context3.t0 = _openpgp.encrypt;
                _context3.t1 = messageObject;
                _context3.t2 = encryptionKey;
                _context3.next = 10;
                return _classPrivateMethodGet(this, _getPrivateKey, _getPrivateKey2).call(this);

              case 10:
                _context3.t3 = _context3.sent;
                _context3.t4 = {
                  message: _context3.t1,
                  encryptionKeys: _context3.t2,
                  signingKeys: _context3.t3
                };
                return _context3.abrupt("return", (0, _context3.t0)(_context3.t4));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function encryptMessage(_x, _x2) {
        return _encryptMessage.apply(this, arguments);
      }

      return encryptMessage;
    }()
    /** Decrypt an encrypted message. The message is encrypted with the public key
     * of this instance.The decryptage will use the private key of this instance
     */

  }, {
    key: "decryptMessage",
    value: function () {
      var _decryptMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var encryptedArmoredMsg,
            message,
            _args4 = arguments;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                encryptedArmoredMsg = _args4.length > 0 && _args4[0] !== undefined ? _args4[0] : '';

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, encryptedArmoredMsg, 'Encrypted message');

                _context4.next = 4;
                return (0, _openpgp.readMessage)({
                  armoredMessage: encryptedArmoredMsg
                });

              case 4:
                message = _context4.sent;
                _context4.t0 = _openpgp.decrypt;
                _context4.t1 = message;
                _context4.next = 9;
                return this.getPublicKey();

              case 9:
                _context4.t2 = _context4.sent;
                _context4.next = 12;
                return _classPrivateMethodGet(this, _getPrivateKey, _getPrivateKey2).call(this);

              case 12:
                _context4.t3 = _context4.sent;
                _context4.t4 = {
                  message: _context4.t1,
                  verificationKeys: _context4.t2,
                  decryptionKeys: _context4.t3
                };
                return _context4.abrupt("return", (0, _context4.t0)(_context4.t4));

              case 15:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function decryptMessage() {
        return _decryptMessage.apply(this, arguments);
      }

      return decryptMessage;
    }()
  }, {
    key: "userID",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _userIDs)[0];
    }
  }, {
    key: "foreignPubKeys",
    get: function get() {
      return (0, _classPrivateFieldGet2["default"])(this, _foreignPubKeys);
    }
  }, {
    key: "getPublicArmoredKey",
    value: function getPublicArmoredKey() {
      if ((0, _classPrivateFieldGet2["default"])(this, _instance)) {
        return (0, _classPrivateFieldGet2["default"])(this, _publicKey);
      }

      throw new Error('Instance not initialized');
    }
  }, {
    key: "getPublicKey",
    value: function () {
      var _getPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context5.next = 2;
                  break;
                }

                return _context5.abrupt("return", (0, _openpgp.readKey)({
                  armoredKey: (0, _classPrivateFieldGet2["default"])(this, _publicKey)
                }));

              case 2:
                throw new Error('Instance not initialized');

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getPublicKey() {
        return _getPublicKey.apply(this, arguments);
      }

      return getPublicKey;
    }()
  }, {
    key: "getPublicKeyBoth",
    value: function () {
      var _getPublicKeyBoth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context6.next = 6;
                  break;
                }

                _context6.next = 3;
                return this.getPublicKey();

              case 3:
                _context6.t0 = _context6.sent;
                _context6.t1 = (0, _classPrivateFieldGet2["default"])(this, _publicKey);
                return _context6.abrupt("return", {
                  pubKey: _context6.t0,
                  publicKey: _context6.t1
                });

              case 6:
                throw new Error('Instance not initialized');

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getPublicKeyBoth() {
        return _getPublicKeyBoth.apply(this, arguments);
      }

      return getPublicKeyBoth;
    }()
  }, {
    key: "getPrivateArmoredKey",
    value: function getPrivateArmoredKey() {
      if ((0, _classPrivateFieldGet2["default"])(this, _instance)) {
        return (0, _classPrivateFieldGet2["default"])(this, _privateKey);
      }

      throw new Error('Instance not initialized');
    }
  }, {
    key: "getPrivateKey",
    value: function () {
      var _getPrivateKey3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7() {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", _classPrivateMethodGet(this, _getPrivateKey, _getPrivateKey2).call(this));

              case 2:
                throw new Error('Instance not initialized');

              case 3:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getPrivateKey() {
        return _getPrivateKey3.apply(this, arguments);
      }

      return getPrivateKey;
    }()
  }, {
    key: "getPrivateKeyBoth",
    value: function () {
      var _getPrivateKeyBoth = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context8.next = 6;
                  break;
                }

                _context8.next = 3;
                return this.getPrivateKey();

              case 3:
                _context8.t0 = _context8.sent;
                _context8.t1 = (0, _classPrivateFieldGet2["default"])(this, _privateKey);
                return _context8.abrupt("return", {
                  privKey: _context8.t0,
                  privateKey: _context8.t1
                });

              case 6:
                throw new Error('Instance not initialized');

              case 7:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getPrivateKeyBoth() {
        return _getPrivateKeyBoth.apply(this, arguments);
      }

      return getPrivateKeyBoth;
    }()
  }, {
    key: "getArmoredKeys",
    value: function getArmoredKeys() {
      if ((0, _classPrivateFieldGet2["default"])(this, _instance)) {
        return {
          privateArmoredKey: (0, _classPrivateFieldGet2["default"])(this, _privateKey),
          publicArmoredKey: (0, _classPrivateFieldGet2["default"])(this, _publicKey),
          passphrase: (0, _classPrivateFieldGet2["default"])(this, _passphrase)
        };
      }

      throw new Error('Instance not initialized');
    }
  }, {
    key: "getKeys",
    value: function () {
      var _getKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 3;
                return this.getPrivateKey();

              case 3:
                _context9.t0 = _context9.sent;
                _context9.next = 6;
                return this.getPublicKey();

              case 6:
                _context9.t1 = _context9.sent;
                _context9.t2 = (0, _classPrivateFieldGet2["default"])(this, _passphrase);
                return _context9.abrupt("return", {
                  privateKey: _context9.t0,
                  publicKey: _context9.t1,
                  passphrase: _context9.t2
                });

              case 9:
                throw new Error('Instance not initialized');

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function getKeys() {
        return _getKeys.apply(this, arguments);
      }

      return getKeys;
    }()
  }, {
    key: "toJSON",
    value: function toJSON() {
      return (0, _classPrivateFieldGet2["default"])(this, _instance) ? {
        userIDs: (0, _classPrivateFieldGet2["default"])(this, _userIDs),
        publicKey: (0, _classPrivateFieldGet2["default"])(this, _publicKey),
        foreignPubKeys: (0, _classPrivateFieldGet2["default"])(this, _foreignPubKeys)
      } : {};
    }
  }], [{
    key: "createAsymetricKeys",
    value: function () {
      var _createAsymetricKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
        var userIDs,
            passphrase,
            keys,
            _args10 = arguments;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                userIDs = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : [{
                  name: '',
                  email: ''
                }];
                passphrase = _args10.length > 1 && _args10[1] !== undefined ? _args10[1] : '';
                _context10.next = 4;
                return (0, _openpgp.generateKey)({
                  type: 'ecc',
                  curve: 'ed25519',
                  userIDs: userIDs,
                  passphrase: passphrase
                });

              case 4:
                keys = _context10.sent;
                return _context10.abrupt("return", {
                  pubKey: keys.publicKey,
                  privKey: keys.privateKey
                });

              case 6:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function createAsymetricKeys() {
        return _createAsymetricKeys.apply(this, arguments);
      }

      return createAsymetricKeys;
    }()
  }, {
    key: "encryptMessageStatic",
    value: function () {
      var _encryptMessageStatic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(_ref2) {
        var _ref2$message, message, _ref2$armoredEncrypti, armoredEncryptionKey, messageObject, pubKey;

        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _ref2$message = _ref2.message, message = _ref2$message === void 0 ? '' : _ref2$message, _ref2$armoredEncrypti = _ref2.armoredEncryptionKey, armoredEncryptionKey = _ref2$armoredEncrypti === void 0 ? '' : _ref2$armoredEncrypti;

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, message, 'Message to encrypt');

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, armoredEncryptionKey, 'Encryption public key');

                _context11.next = 5;
                return (0, _openpgp.createMessage)({
                  text: message
                });

              case 5:
                messageObject = _context11.sent;
                _context11.next = 8;
                return (0, _openpgp.readKey)({
                  armoredKey: armoredEncryptionKey
                });

              case 8:
                pubKey = _context11.sent;
                return _context11.abrupt("return", (0, _openpgp.encrypt)({
                  message: messageObject,
                  encryptionKeys: pubKey
                }));

              case 10:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11);
      }));

      function encryptMessageStatic(_x3) {
        return _encryptMessageStatic.apply(this, arguments);
      }

      return encryptMessageStatic;
    }()
  }, {
    key: "readArmoredPublicKey",
    value: function () {
      var _readArmoredPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12() {
        var armoredPublicKey,
            _args12 = arguments;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                armoredPublicKey = _args12.length > 0 && _args12[0] !== undefined ? _args12[0] : '';
                return _context12.abrupt("return", (0, _openpgp.readKey)({
                  armoredKey: armoredPublicKey
                }));

              case 2:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12);
      }));

      function readArmoredPublicKey() {
        return _readArmoredPublicKey.apply(this, arguments);
      }

      return readArmoredPublicKey;
    }()
  }, {
    key: "decryptMessageStatic",
    value: function () {
      var _decryptMessageStatic = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(_ref3) {
        var encryptedArmoredMsg, _ref3$armoredDecrypti, armoredDecryptionKeys, _ref3$passphrase, passphrase, privateKey, message;

        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                encryptedArmoredMsg = _ref3.encryptedArmoredMsg, _ref3$armoredDecrypti = _ref3.armoredDecryptionKeys, armoredDecryptionKeys = _ref3$armoredDecrypti === void 0 ? '' : _ref3$armoredDecrypti, _ref3$passphrase = _ref3.passphrase, passphrase = _ref3$passphrase === void 0 ? '' : _ref3$passphrase;

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, encryptedArmoredMsg, 'Encrypted message');

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, armoredDecryptionKeys, 'Decryption Key');

                privateKey = armoredDecryptionKeys;

                if (!passphrase) {
                  _context13.next = 14;
                  break;
                }

                _context13.t0 = _openpgp.decryptKey;
                _context13.next = 8;
                return (0, _openpgp.readPrivateKey)({
                  armoredKey: armoredDecryptionKeys
                });

              case 8:
                _context13.t1 = _context13.sent;
                _context13.t2 = passphrase;
                _context13.t3 = {
                  privateKey: _context13.t1,
                  passphrase: _context13.t2
                };
                _context13.next = 13;
                return (0, _context13.t0)(_context13.t3);

              case 13:
                privateKey = _context13.sent;

              case 14:
                _context13.next = 16;
                return (0, _openpgp.readMessage)({
                  armoredMessage: encryptedArmoredMsg
                });

              case 16:
                message = _context13.sent;
                return _context13.abrupt("return", (0, _openpgp.decrypt)({
                  message: message,
                  decryptionKeys: privateKey
                })["catch"](function () {
                  throw new Error("Invalid passphrase");
                }));

              case 18:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13);
      }));

      function decryptMessageStatic(_x4) {
        return _decryptMessageStatic.apply(this, arguments);
      }

      return decryptMessageStatic;
    }()
  }, {
    key: "fromArmoredKeys",
    value:
    /**
     * @static
     * Create and return an instance of {@link GPGEncryptor} using a publicArmoredKey,
     * a privateKeyArmored key and it passphrase to decrypt it.
     * - The passphrase is optional.<br>
     * - An exception will be thrown if the private
     * Armored key is encrypted but no passphrase is provided.
     * @param {string} publicArmoredKey - The armored public key
     * @param {string} privateKeyArmored - The armored private key
     * @param {string} passphrase - The passphrase to decrypt the private key
     */
    function () {
      var _fromArmoredKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(_ref4) {
        var publicArmoredKey, privateArmoredKey, _ref4$passphrase, passphrase, publicKey, userIDs, that;

        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                publicArmoredKey = _ref4.publicArmoredKey, privateArmoredKey = _ref4.privateArmoredKey, _ref4$passphrase = _ref4.passphrase, passphrase = _ref4$passphrase === void 0 ? '' : _ref4$passphrase;

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, publicArmoredKey, 'Public key');

                _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _typeAndContentVerification).call(GPGEncryptor, privateArmoredKey, 'Private key');

                _context14.t0 = _openpgp.decryptKey;
                _context14.next = 6;
                return (0, _openpgp.readPrivateKey)({
                  armoredKey: privateArmoredKey
                });

              case 6:
                _context14.t1 = _context14.sent;
                _context14.t2 = passphrase;
                _context14.t3 = {
                  privateKey: _context14.t1,
                  passphrase: _context14.t2
                };
                _context14.next = 11;
                return (0, _context14.t0)(_context14.t3)["catch"](function () {
                  throw new Error('Invalid passphrase');
                });

              case 11:
                _context14.next = 13;
                return (0, _openpgp.readKey)({
                  armoredKey: publicArmoredKey
                });

              case 13:
                publicKey = _context14.sent;
                userIDs = _classStaticPrivateMethodGet(GPGEncryptor, GPGEncryptor, _getUserIDs).call(GPGEncryptor, publicKey);
                that = new GPGEncryptor({
                  userIDs: userIDs,
                  passphrase: passphrase
                });
                (0, _classPrivateFieldSet2["default"])(that, _privateKey, privateArmoredKey);
                (0, _classPrivateFieldSet2["default"])(that, _publicKey, publicArmoredKey);
                (0, _classPrivateFieldSet2["default"])(that, _instance, that);
                return _context14.abrupt("return", that);

              case 20:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14);
      }));

      function fromArmoredKeys(_x5) {
        return _fromArmoredKeys.apply(this, arguments);
      }

      return fromArmoredKeys;
    }()
  }]);
  return GPGEncryptor;
}();

exports["default"] = GPGEncryptor;

function _generateKey2() {
  return _generateKey3.apply(this, arguments);
}

function _generateKey3() {
  _generateKey3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15() {
    var type,
        keyParameters,
        _args15 = arguments;
    return _regenerator["default"].wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            type = _args15.length > 0 && _args15[0] !== undefined ? _args15[0] : 'ecc';
            keyParameters = {
              type: type,
              userIDs: (0, _classPrivateFieldGet2["default"])(this, _userIDs),
              curve: 'ed25519',
              passphrase: (0, _classPrivateFieldGet2["default"])(this, _passphrase),
              format: 'armored',
              rsaBits: 4096
            };
            return _context15.abrupt("return", (0, _openpgp.generateKey)(keyParameters));

          case 3:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, this);
  }));
  return _generateKey3.apply(this, arguments);
}

function _getPrivateKey2() {
  return _getPrivateKey4.apply(this, arguments);
}

function _getPrivateKey4() {
  _getPrivateKey4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16() {
    return _regenerator["default"].wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            if (!(0, _classPrivateFieldGet2["default"])(this, _instance)) {
              _context16.next = 13;
              break;
            }

            if (!(0, _classPrivateFieldGet2["default"])(this, _passphrase)) {
              _context16.next = 11;
              break;
            }

            _context16.t1 = _openpgp.decryptKey;
            _context16.next = 5;
            return (0, _openpgp.readPrivateKey)({
              armoredKey: (0, _classPrivateFieldGet2["default"])(this, _privateKey)
            });

          case 5:
            _context16.t2 = _context16.sent;
            _context16.t3 = (0, _classPrivateFieldGet2["default"])(this, _passphrase);
            _context16.t4 = {
              privateKey: _context16.t2,
              passphrase: _context16.t3
            };
            _context16.t0 = (0, _context16.t1)(_context16.t4);
            _context16.next = 12;
            break;

          case 11:
            _context16.t0 = (0, _openpgp.readPrivateKey)({
              armoredKey: (0, _classPrivateFieldGet2["default"])(this, _privateKey)
            });

          case 12:
            return _context16.abrupt("return", _context16.t0);

          case 13:
            throw new Error('Instance not initialized');

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, this);
  }));
  return _getPrivateKey4.apply(this, arguments);
}

function _typeAndContentVerification(text, name) {
  if (typeof text !== 'string') {
    throw new Error("Expected ".concat(name, " to be of type 'string' but got type '").concat((0, _typeof2["default"])(text), "'"));
  } else if (!text) {
    throw new Error("Empty ".concat(name, " not allowed"));
  }
}

function _getUserIDs(publicKey) {
  return (0, _toConsumableArray2["default"])(publicKey.users.map(function (u) {
    return {
      name: u.userID.name,
      email: u.userID.email
    };
  }));
}