"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vote = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _aes = require("../../../../utils/lib/aes.utils");

var _gpgEncryptor = _interopRequireDefault(require("../../../../utils/lib/gpgEncryptor"));

var _utils = require("../utils/utils");

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

function _classStaticPrivateMethodGet(receiver, classConstructor, method) { _classCheckPrivateStaticAccess(receiver, classConstructor); return method; }

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _aesKey = /*#__PURE__*/new WeakMap();

var _aesKeyEncrypted = /*#__PURE__*/new WeakMap();

var _userGPGKeys = /*#__PURE__*/new WeakMap();

var _userGPGEncryptor = /*#__PURE__*/new WeakMap();

var _encryptAesKey = /*#__PURE__*/new WeakSet();

var _getUserKeysFromServer = /*#__PURE__*/new WeakSet();

var _makeVote = /*#__PURE__*/new WeakMap();

var _decryptUserGPGKeys = /*#__PURE__*/new WeakSet();

var _createEncryptedMsg = /*#__PURE__*/new WeakSet();

var _createEncryptedBallot = /*#__PURE__*/new WeakSet();

var _getNewVoteID = /*#__PURE__*/new WeakSet();

var _prepareMSG = /*#__PURE__*/new WeakSet();

var Vote = /*#__PURE__*/function () {
  function Vote(_ref) {
    var _this = this;

    var _ref$ballot = _ref.ballot,
        ballot = _ref$ballot === void 0 ? {
      candidateID: -1,
      UID: -1
    } : _ref$ballot,
        _ref$UID = _ref.UID,
        UID = _ref$UID === void 0 ? -1 : _ref$UID;
    (0, _classCallCheck2["default"])(this, Vote);

    _prepareMSG.add(this);

    _getNewVoteID.add(this);

    _createEncryptedBallot.add(this);

    _createEncryptedMsg.add(this);

    _decryptUserGPGKeys.add(this);

    _getUserKeysFromServer.add(this);

    _encryptAesKey.add(this);

    (0, _defineProperty2["default"])(this, "serverPubkey", '');
    (0, _defineProperty2["default"])(this, "coPubkey", '');
    (0, _defineProperty2["default"])(this, "vcPubkey", '');
    (0, _defineProperty2["default"])(this, "ballot", {});
    (0, _defineProperty2["default"])(this, "UID", '');

    _aesKey.set(this, {
      writable: true,
      value: ''
    });

    _aesKeyEncrypted.set(this, {
      writable: true,
      value: ''
    });

    _userGPGKeys.set(this, {
      writable: true,
      value: ''
    });

    _userGPGEncryptor.set(this, {
      writable: true,
      value: null
    });

    _makeVote.set(this, {
      writable: true,
      value: function () {
        var _value = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(encryptedUserGPGkeys) {
          var userGPGKeys, encryptedBallot, _yield$_classPrivateM, voteID, msg, coMsg, vcMsg, _yield$postData, response, _yield$postData2, msgServer;

          return _regenerator["default"].wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  userGPGKeys = _classPrivateMethodGet(_this, _decryptUserGPGKeys, _decryptUserGPGKeys2).call(_this, encryptedUserGPGkeys.data);
                  _context.t0 = _classPrivateFieldSet2["default"];
                  _context.t1 = _this;
                  _context.t2 = _userGPGEncryptor;
                  _context.next = 7;
                  return _classStaticPrivateMethodGet(Vote, Vote, _createUserGPGEncryptor).call(Vote, userGPGKeys);

                case 7:
                  _context.t3 = _context.sent;
                  (0, _context.t0)(_context.t1, _context.t2, _context.t3);
                  _context.next = 11;
                  return _classPrivateMethodGet(_this, _createEncryptedBallot, _createEncryptedBallot2).call(_this);

                case 11:
                  encryptedBallot = _context.sent;
                  _context.next = 14;
                  return _classPrivateMethodGet(_this, _getNewVoteID, _getNewVoteID2).call(_this);

                case 14:
                  _yield$_classPrivateM = _context.sent;
                  voteID = _yield$_classPrivateM.id;
                  msg = {
                    voteID: voteID,
                    encryptedBallot: encryptedBallot
                  };
                  _context.next = 19;
                  return _classPrivateMethodGet(_this, _prepareMSG, _prepareMSG2).call(_this, msg, _this.coPubkey);

                case 19:
                  coMsg = _context.sent;
                  _context.next = 22;
                  return _classPrivateMethodGet(_this, _prepareMSG, _prepareMSG2).call(_this, msg, _this.vcPubkey);

                case 22:
                  vcMsg = _context.sent;
                  _context.next = 25;
                  return (0, _utils.postData)({
                    url: '/api/vote/submit/co',
                    data: {
                      vote: coMsg
                    }
                  });

                case 25:
                  _yield$postData = _context.sent;
                  response = _yield$postData.data;
                  _context.next = 29;
                  return (0, _utils.postData)({
                    url: '/api/vote/submit/vc',
                    data: {
                      vote: vcMsg
                    }
                  });

                case 29:
                  _yield$postData2 = _context.sent;
                  msgServer = _yield$postData2.data;
                  console.log('Server Has reponded: ', response, 'then', msgServer);
                  return _context.abrupt("return", msg);

                case 35:
                  _context.prev = 35;
                  _context.t4 = _context["catch"](0);
                  return _context.abrupt("return", console.log(_context.t4));

                case 38:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, null, [[0, 35]]);
        }));

        function value(_x) {
          return _value.apply(this, arguments);
        }

        return value;
      }()
    });

    if (!_classStaticPrivateFieldSpecGet(Vote, Vote, _instance)) {
      this.ballot = ballot;
      this.UID = UID;
      (0, _classPrivateFieldSet2["default"])(this, _aesKey, (0, _aes.generateAESKey)(1000));

      _classStaticPrivateFieldSpecSet(Vote, Vote, _instance, this);
    }

    return _classStaticPrivateFieldSpecGet(Vote, Vote, _instance);
  }

  (0, _createClass2["default"])(Vote, [{
    key: "initialize",
    value: function () {
      var _initialize = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _classStaticPrivateMethodGet(Vote, Vote, _getEntityPublicKey).call(Vote, 'server');

              case 2:
                this.serverPubkey = _context2.sent;
                _context2.next = 5;
                return _classStaticPrivateMethodGet(Vote, Vote, _getEntityPublicKey).call(Vote, 'countCenter');

              case 5:
                this.coPubkey = _context2.sent;
                _context2.next = 8;
                return _classStaticPrivateMethodGet(Vote, Vote, _getEntityPublicKey).call(Vote, 'valCenter');

              case 8:
                this.vcPubkey = _context2.sent;
                _context2.next = 11;
                return _classPrivateMethodGet(this, _encryptAesKey, _encryptAesKey2).call(this);

              case 11:
                return _context2.abrupt("return", this);

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function initialize() {
        return _initialize.apply(this, arguments);
      }

      return initialize;
    }()
  }, {
    key: "runVoteProcess",
    value: function () {
      var _runVoteProcess = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (_classStaticPrivateFieldSpecGet(Vote, Vote, _instance)) {
                  _context3.next = 2;
                  break;
                }

                throw new Error('Instance Not initialized');

              case 2:
                _classPrivateMethodGet(this, _getUserKeysFromServer, _getUserKeysFromServer2).call(this).then((0, _classPrivateFieldGet2["default"])(this, _makeVote))["catch"](console.log);

              case 3:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function runVoteProcess() {
        return _runVoteProcess.apply(this, arguments);
      }

      return runVoteProcess;
    }()
  }]);
  return Vote;
}();

exports.Vote = Vote;

function _encryptAesKey2() {
  return _encryptAesKey3.apply(this, arguments);
}

function _encryptAesKey3() {
  _encryptAesKey3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.t0 = _classPrivateFieldSet2["default"];
            _context4.t1 = this;
            _context4.t2 = _aesKeyEncrypted;
            _context4.next = 5;
            return _gpgEncryptor["default"].encryptMessageStatic({
              message: (0, _classPrivateFieldGet2["default"])(this, _aesKey),
              armoredEncryptionKey: this.serverPubkey
            });

          case 5:
            _context4.t3 = _context4.sent;
            (0, _context4.t0)(_context4.t1, _context4.t2, _context4.t3);

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));
  return _encryptAesKey3.apply(this, arguments);
}

function _getUserKeysFromServer2() {
  return _getUserKeysFromServer3.apply(this, arguments);
}

function _getUserKeysFromServer3() {
  _getUserKeysFromServer3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", (0, _utils.postData)({
              url: "/api/keys/all/user/id/".concat(this.UID),
              data: {
                expected: (0, _classPrivateFieldGet2["default"])(this, _aesKeyEncrypted)
              }
            }));

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));
  return _getUserKeysFromServer3.apply(this, arguments);
}

function _decryptUserGPGKeys2(userPGPkeys) {
  var decrypted = (0, _aes.decryptMessage)(userPGPkeys, (0, _classPrivateFieldGet2["default"])(this, _aesKey));
  return JSON.parse(decrypted);
}

function _createUserGPGEncryptor(_x2) {
  return _createUserGPGEncryptor3.apply(this, arguments);
}

function _createUserGPGEncryptor3() {
  _createUserGPGEncryptor3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(userGPGKeys) {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _gpgEncryptor["default"].fromArmoredKeys(userGPGKeys));

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _createUserGPGEncryptor3.apply(this, arguments);
}

function _createEncryptedMsg2(_x3) {
  return _createEncryptedMsg3.apply(this, arguments);
}

function _createEncryptedMsg3() {
  _createEncryptedMsg3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(msg) {
    var armoredPubkey,
        stringify,
        msgStringified,
        publicKey,
        _args7 = arguments;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            armoredPubkey = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : '';
            stringify = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : true;
            msgStringified = stringify ? JSON.stringify(msg) : msg;
            _context7.next = 5;
            return _gpgEncryptor["default"].readArmoredPublicKey(armoredPubkey);

          case 5:
            publicKey = _context7.sent;
            return _context7.abrupt("return", (0, _classPrivateFieldGet2["default"])(this, _userGPGEncryptor).encryptMessage(msgStringified, publicKey));

          case 7:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));
  return _createEncryptedMsg3.apply(this, arguments);
}

function _createEncryptedBallot2() {
  return _createEncryptedBallot3.apply(this, arguments);
}

function _createEncryptedBallot3() {
  _createEncryptedBallot3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8() {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _classPrivateMethodGet(this, _createEncryptedMsg, _createEncryptedMsg2).call(this, this.ballot, this.vcPubkey));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this);
  }));
  return _createEncryptedBallot3.apply(this, arguments);
}

function _getNewVoteID2() {
  return _getNewVoteID3.apply(this, arguments);
}

function _getNewVoteID3() {
  _getNewVoteID3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    var userPubKey, _yield$postData3, voteIdEncrypted, error, _yield$_classPrivateF, data;

    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            userPubKey = (0, _classPrivateFieldGet2["default"])(this, _userGPGEncryptor).getPublicArmoredKey();
            _context9.next = 3;
            return (0, _utils.postData)({
              url: "/api/vote/voteid?uid=".concat(this.UID),
              data: {
                armoredPublicKey: userPubKey
              }
            });

          case 3:
            _yield$postData3 = _context9.sent;
            voteIdEncrypted = _yield$postData3.data;
            error = _yield$postData3.error;

            if (!error) {
              _context9.next = 9;
              break;
            }

            console.log(error);
            return _context9.abrupt("return", error);

          case 9:
            _context9.next = 11;
            return (0, _classPrivateFieldGet2["default"])(this, _userGPGEncryptor).decryptMessage(voteIdEncrypted);

          case 11:
            _yield$_classPrivateF = _context9.sent;
            data = _yield$_classPrivateF.data;
            console.log('VOTE ID', data);
            return _context9.abrupt("return", JSON.parse(data));

          case 15:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));
  return _getNewVoteID3.apply(this, arguments);
}

function _prepareMSG2(_x4, _x5) {
  return _prepareMSG3.apply(this, arguments);
}

function _prepareMSG3() {
  _prepareMSG3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(msg, entityPublicKey) {
    var encMSG;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _classPrivateMethodGet(this, _createEncryptedMsg, _createEncryptedMsg2).call(this, msg, entityPublicKey);

          case 2:
            encMSG = _context10.sent;
            return _context10.abrupt("return", _classPrivateMethodGet(this, _createEncryptedMsg, _createEncryptedMsg2).call(this, encMSG, this.serverPubkey, false));

          case 4:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));
  return _prepareMSG3.apply(this, arguments);
}

function _getEntityPublicKey(_x6) {
  return _getEntityPublicKey3.apply(this, arguments);
}

function _getEntityPublicKey3() {
  _getEntityPublicKey3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(entity) {
    var response, pubKey;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return fetch("/api/keys/public/".concat(entity));

          case 2:
            response = _context11.sent;
            _context11.next = 5;
            return response.json();

          case 5:
            pubKey = _context11.sent;
            return _context11.abrupt("return", pubKey.data);

          case 7:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));
  return _getEntityPublicKey3.apply(this, arguments);
}

var _instance = {
  writable: true,
  value: null
};