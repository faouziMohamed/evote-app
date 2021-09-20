"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveUserKeys = saveUserKeys;
exports.getKeys = getKeys;
exports.getFullName = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _common = require("../../data/common.cms");

var _keys = _interopRequireWildcard(require("../../models/keys.model"));

var _users = _interopRequireDefault(require("../../models/users.model"));

var _aes = require("../../utils/lib/aes.utils");

var _index = require("./index.entities");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getFullName = function getFullName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    first: '',
    last: ''
  };
  return "".concat(name.first, " ").concat(name.last);
};

exports.getFullName = getFullName;

function areKeysPassedCorrect(_ref) {
  var publicArmoredKey = _ref.publicArmoredKey,
      privateArmoredKey = _ref.privateArmoredKey,
      passphrase = _ref.passphrase;
  var msg = {
    error: false
  };

  if (!publicArmoredKey && !privateArmoredKey && !passphrase) {
    msg.error = (0, _common.getErrorMessage)('noBodyPassed');
  } else if (!publicArmoredKey) {
    msg.error = (0, _common.getErrorMessage)('noPubkeyPassed');
  } else if (!privateArmoredKey) {
    msg.error = (0, _common.getErrorMessage)('noPrivkeyPassed');
  } else if (!passphrase) {
    msg.error = (0, _common.getErrorMessage)('noPassphrasePassed');
  }

  return msg;
}

function checkCredentials(user, _ref2) {
  var username = _ref2.username,
      cin = _ref2.cin,
      id = _ref2.id;
  var msg = {
    error: false
  };

  if (id && id !== user.id || username && username !== user.username || cin && Number(cin) !== user.cin) {
    msg.error = (0, _common.getErrorMessage)('wrongCredentials');
  }

  return msg;
}

function getOnlyUserKeys(_x) {
  return _getOnlyUserKeys.apply(this, arguments);
}

function _getOnlyUserKeys() {
  _getOnlyUserKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    var filter,
        userKeys,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            _context.next = 3;
            return _keys["default"].findOne({
              email: user.email
            }, filter).lean().exec();

          case 3:
            userKeys = _context.sent;

            if (userKeys) {
              userKeys.passphrase = (0, _keys.decryptPassphrase)(userKeys.passphrase);
            }

            return _context.abrupt("return", userKeys);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getOnlyUserKeys.apply(this, arguments);
}

function decryptReqBodyMsg(_x2) {
  return _decryptReqBodyMsg.apply(this, arguments);
}

function _decryptReqBodyMsg() {
  _decryptReqBodyMsg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(msg) {
    var toJson,
        entityName,
        _yield$getEncryptionK,
        entityGPGEncryptor,
        decryptedMessage,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            toJson = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : true;
            entityName = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'server';
            _context2.next = 4;
            return (0, _index.getEncryptionKeys)(entityName);

          case 4:
            _yield$getEncryptionK = _context2.sent;
            entityGPGEncryptor = _yield$getEncryptionK.entityGPGEncryptor;
            _context2.next = 8;
            return entityGPGEncryptor.decryptMessage(msg);

          case 8:
            decryptedMessage = _context2.sent;
            return _context2.abrupt("return", toJson ? JSON.parse(decryptedMessage.data) : decryptedMessage.data);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _decryptReqBodyMsg.apply(this, arguments);
}

function saveUserKeys(_x3, _x4) {
  return _saveUserKeys.apply(this, arguments);
}

function _saveUserKeys() {
  _saveUserKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var user, armoredKeysWithPassphrase, msg, name, email, keys;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            user = req.user;
            _context3.next = 3;
            return decryptReqBodyMsg(req.body.encrypted);

          case 3:
            armoredKeysWithPassphrase = _context3.sent;
            msg = checkCredentials(user, req.params);

            if (!msg.error) {
              _context3.next = 7;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: msg.error
            }));

          case 7:
            msg = areKeysPassedCorrect(armoredKeysWithPassphrase);

            if (!msg.error) {
              _context3.next = 10;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              error: msg.error
            }));

          case 10:
            name = getFullName(user.name);
            email = user.email;
            keys = new _keys["default"](_objectSpread({
              email: email,
              name: name
            }, armoredKeysWithPassphrase));
            _context3.next = 15;
            return _users["default"].findByIdAndUpdate(user.id, {
              $set: {
                isFirstLogin: false
              }
            }, {
              "new": true
            }).lean().exec();

          case 15:
            req.user = _context3.sent;
            return _context3.abrupt("return", keys.save().then(function () {
              return res.status(201).json({
                success: (0, _common.getSuccessMessage)('keysSaved')
              });
            })["catch"](function (err) {
              if (err.code === 11000) {
                return res.status(302).json({
                  error: 'Error 11000, contact an administrator for more details.\n Insisting with operation will make your account locked'
                });
              }

              return res.status(500).json({
                error: err
              });
            }));

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _saveUserKeys.apply(this, arguments);
}

function getKeys(_x5, _x6) {
  return _getKeys.apply(this, arguments);
}

function _getKeys() {
  _getKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user, aesKeyEncrypted, msg, filter, keys, keysString, aesKey, encrypted;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            user = req.user;
            aesKeyEncrypted = req.body.expected; // expected is a aesKey

            msg = checkCredentials(user, req.params);

            if (!msg.error) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              error: msg.error
            }));

          case 5:
            if (aesKeyEncrypted) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              error: (0, _common.getErrorMessage)('noEncryptKeyPassed')
            }));

          case 7:
            filter = {
              _id: 0,
              __v: 0,
              email: 0,
              name: 0
            };
            _context4.next = 10;
            return getOnlyUserKeys(user, filter);

          case 10:
            keys = _context4.sent;

            if (keys) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", res.status(204).end());

          case 13:
            keysString = JSON.stringify(keys);
            _context4.next = 16;
            return decryptReqBodyMsg(aesKeyEncrypted, false);

          case 16:
            aesKey = _context4.sent;
            encrypted = (0, _aes.encryptMessage)(keysString, aesKey);
            return _context4.abrupt("return", res.status(200).json({
              data: encrypted.toString()
            }));

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getKeys.apply(this, arguments);
}