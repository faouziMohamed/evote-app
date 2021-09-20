"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateAndSaveVoteID = generateAndSaveVoteID;
exports.getEncryptedBodyMessage = getEncryptedBodyMessage;
exports.handleCoUserVerification = handleCoUserVerification;
exports.msgDecryptor = exports.voteProcessEvent = exports.getEncryptor = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _events = require("events");

var _users = _interopRequireDefault(require("../models/users.model"));

var _voteIDs = require("../models/voteIDs.model");

var _gpgEncryptor = _interopRequireDefault(require("../utils/lib/gpgEncryptor"));

var _index = require("./entities/index.entities");

var getEncryptor = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var entity,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            entity = _args.length > 0 && _args[0] !== undefined ? _args[0] : 'svr';
            return _context.abrupt("return", (0, _index.getEncryptionKeys)(entity));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getEncryptor() {
    return _ref.apply(this, arguments);
  };
}();

exports.getEncryptor = getEncryptor;
var voteProcessEvent = new _events.EventEmitter();
exports.voteProcessEvent = voteProcessEvent;

function encryptMsg(_x, _x2, _x3) {
  return _encryptMsg.apply(this, arguments);
}

function _encryptMsg() {
  _encryptMsg = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(armoredPublicKey, encryptor, message) {
    var publicKey, voteIdEncrypted;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _gpgEncryptor["default"].readArmoredPublicKey(armoredPublicKey);

          case 2:
            publicKey = _context3.sent;
            _context3.next = 5;
            return encryptor.encryptMessage(message, publicKey);

          case 5:
            voteIdEncrypted = _context3.sent;
            return _context3.abrupt("return", voteIdEncrypted);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _encryptMsg.apply(this, arguments);
}

function generateAndSaveVoteID(_x4) {
  return _generateAndSaveVoteID.apply(this, arguments);
}

function _generateAndSaveVoteID() {
  _generateAndSaveVoteID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req) {
    var armoredPublicKey, voteID, _yield$getEncryptionK, serverEnc, voteIdEncrypted;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            armoredPublicKey = req.body.armoredPublicKey;

            if (armoredPublicKey) {
              _context4.next = 3;
              break;
            }

            throw new Error('No public key provided');

          case 3:
            _context4.t0 = JSON;
            _context4.next = 6;
            return (0, _voteIDs.getNewVoteID)(req.user._id);

          case 6:
            _context4.t1 = _context4.sent;
            _context4.t2 = {
              id: _context4.t1
            };
            voteID = _context4.t0.stringify.call(_context4.t0, _context4.t2);
            _context4.next = 11;
            return (0, _index.getEncryptionKeys)('server');

          case 11:
            _yield$getEncryptionK = _context4.sent;
            serverEnc = _yield$getEncryptionK.entityGPGEncryptor;
            _context4.next = 15;
            return encryptMsg(armoredPublicKey, serverEnc, voteID);

          case 15:
            voteIdEncrypted = _context4.sent;
            return _context4.abrupt("return", voteIdEncrypted);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _generateAndSaveVoteID.apply(this, arguments);
}

var msgDecryptor = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(encryptor, encryptedMessage) {
    var _yield$encryptor$decr, decrypted, decryptedMessage;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return encryptor.decryptMessage(encryptedMessage);

          case 2:
            _yield$encryptor$decr = _context2.sent;
            decrypted = _yield$encryptor$decr.data;
            decryptedMessage = JSON.parse(decrypted);
            return _context2.abrupt("return", decryptedMessage);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function msgDecryptor(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

exports.msgDecryptor = msgDecryptor;

function getEncryptedBodyMessage(_x7) {
  return _getEncryptedBodyMessage.apply(this, arguments);
}

function _getEncryptedBodyMessage() {
  _getEncryptedBodyMessage = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var voteEncrypted, _yield$getEncryptor, serverEnc, _yield$serverEnc$decr, bodyMessage;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            voteEncrypted = req.body.vote;

            if (voteEncrypted) {
              _context5.next = 3;
              break;
            }

            throw new Error('No vote were provided');

          case 3:
            _context5.next = 5;
            return getEncryptor('server');

          case 5:
            _yield$getEncryptor = _context5.sent;
            serverEnc = _yield$getEncryptor.entityGPGEncryptor;
            _context5.next = 9;
            return serverEnc.decryptMessage(voteEncrypted);

          case 9:
            _yield$serverEnc$decr = _context5.sent;
            bodyMessage = _yield$serverEnc$decr.data;
            return _context5.abrupt("return", bodyMessage);

          case 12:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _getEncryptedBodyMessage.apply(this, arguments);
}

function verifyVoteID(_x8) {
  return _verifyVoteID.apply(this, arguments);
}

function _verifyVoteID() {
  _verifyVoteID = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(voteID) {
    var id;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return (0, _voteIDs.findVoteIDById)(voteID);

          case 2:
            id = _context6.sent;

            if (id) {
              _context6.next = 5;
              break;
            }

            throw new Error('Vote ID not found, are you sure that ' + "you've followed the vote process correctly?");

          case 5:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _verifyVoteID.apply(this, arguments);
}

function handleCoUserVerification(_x9, _x10) {
  return _handleCoUserVerification.apply(this, arguments);
}

function _handleCoUserVerification() {
  _handleCoUserVerification = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userVote, req) {
    var voteID;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            voteID = userVote.voteID;
            _context7.next = 3;
            return verifyVoteID(voteID);

          case 3:
            req.session.userVote = userVote;
            voteProcessEvent.once("vote-finished-".concat(req.user.username), finishVoteProcess);
            return _context7.abrupt("return", userVote);

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));
  return _handleCoUserVerification.apply(this, arguments);
}

function finishVoteProcess(_x11) {
  return _finishVoteProcess.apply(this, arguments);
}

function _finishVoteProcess() {
  _finishVoteProcess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _users["default"].findByIdAndUpdate(req.user._id, {
              $set: {
                hasVoted: true
              }
            }, {
              "new": true
            }).lean().exec();

          case 2:
            req.user = _context8.sent;

          case 3:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));
  return _finishVoteProcess.apply(this, arguments);
}