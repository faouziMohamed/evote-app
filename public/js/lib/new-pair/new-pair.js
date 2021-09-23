"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.runOnLoad = runOnLoad;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _aes = require("../../../../utils/lib/aes.utils");

var _gpgEncryptor = _interopRequireDefault(require("../../../../utils/lib/gpgEncryptor"));

var _utils = require("../utils/utils");

var _newPair = require("./new-pair.utils");

function runOnLoad() {
  return _runOnLoad.apply(this, arguments);
}

function _runOnLoad() {
  _runOnLoad = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var btn, _getUIDFromCookie, UID, cookieErr, userCookie, _yield$getServerPubKe, serverArmoredPubKey, keyError, URL, _yield$fetchUserData, userData, userDataError, encryptor, encrypted, _yield$postData, postError;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            btn = new _newPair.ActionButton({
              show: false
            });
            (0, _newPair.displayMessage)('Fetching data...');
            _getUIDFromCookie = getUIDFromCookie('ps'), UID = _getUIDFromCookie.UID, cookieErr = _getUIDFromCookie.error;

            if (!cookieErr) {
              _context.next = 6;
              break;
            }

            btn.updateButton(function () {
              return (0, _utils.reloadPage)();
            }, 'Reload page', true);
            return _context.abrupt("return", (0, _newPair.displayError)(cookieErr));

          case 6:
            userCookie = getCookie();
            if (!userCookie) (0, _utils.redirectTo)('/vote');
            (0, _newPair.displayMessage)('Establishing communication with the server...');
            _context.next = 11;
            return getServerPubKey('/api/keys/public/server');

          case 11:
            _yield$getServerPubKe = _context.sent;
            serverArmoredPubKey = _yield$getServerPubKe.data;
            keyError = _yield$getServerPubKe.error;

            if (!keyError) {
              _context.next = 17;
              break;
            }

            btn.updateButton(function () {
              return (0, _utils.reloadPage)();
            }, 'Reload page', true);
            return _context.abrupt("return", (0, _newPair.displayError)(keyError));

          case 17:
            (0, _newPair.displayMessage)('Applying some security things...');
            URL = "/api/users/id/".concat(UID, "?name=true&log_status=true");
            _context.next = 21;
            return fetchUserData(URL);

          case 21:
            _yield$fetchUserData = _context.sent;
            userData = _yield$fetchUserData.userData;
            userDataError = _yield$fetchUserData.error;

            if (!userDataError) {
              _context.next = 27;
              break;
            }

            btn.updateButton(function () {
              return (0, _utils.redirectTo)('/activate');
            }, 'Activate account', true);
            return _context.abrupt("return", (0, _newPair.displayError)(userDataError));

          case 27:
            (0, _newPair.displayMessage)('Generating encryptions keys...');
            _context.next = 30;
            return createNewPairKeys(userData);

          case 30:
            encryptor = _context.sent;
            (0, _newPair.displayMessage)("Almost done...");
            _context.next = 34;
            return encryptGeneratedKeys(encryptor, serverArmoredPubKey);

          case 34:
            encrypted = _context.sent;
            (0, _newPair.displayMessage)('Sending data to the server...');
            _context.next = 38;
            return (0, _utils.postData)({
              url: "/api/keys/user/id/".concat(UID),
              data: {
                encrypted: encrypted
              }
            });

          case 38:
            _yield$postData = _context.sent;
            postError = _yield$postData.error;

            if (!postError) {
              _context.next = 43;
              break;
            }

            btn.updateButton(function () {
              return (0, _utils.redirectTo)('/login');
            }, 'Go to login page', true);
            return _context.abrupt("return", (0, _newPair.displayError)(postError));

          case 43:
            (0, _newPair.hideLoadSpinner)();
            btn.updateButton(function () {
              return (0, _utils.redirectTo)('/vote');
            }, 'Continue', false);
            return _context.abrupt("return", (0, _newPair.displayMessage)("Done!"));

          case 46:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _runOnLoad.apply(this, arguments);
}

function getCookie() {
  return JSON.parse((0, _utils.decodeCookie)((0, _utils.getDataFromCookie)('ps')));
}

function getUIDFromCookie(cookieName) {
  try {
    var cookie = (0, _utils.getDataFromCookie)(cookieName);

    if (!cookie) {
      return {
        error: 'An error occured! Please reload the page to retry!'
      };
    }

    return {
      UID: JSON.parse((0, _utils.decodeCookie)(cookie)).UID
    };
  } catch (e) {
    return {
      error: 'An error occured! Please reload the page to retry!'
    };
  }
}

function fetchUserData(_x) {
  return _fetchUserData.apply(this, arguments);
}

function _fetchUserData() {
  _fetchUserData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(URL) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", fetch(URL).then( /*#__PURE__*/function () {
              var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(res) {
                var _yield$res$json, data, error, name, email, passphrase, userData;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return res.json();

                      case 2:
                        _yield$res$json = _context2.sent;
                        data = _yield$res$json.data;
                        error = _yield$res$json.error;

                        if (!error) {
                          _context2.next = 7;
                          break;
                        }

                        return _context2.abrupt("return", {
                          error: error
                        });

                      case 7:
                        if (data !== null && data !== void 0 && data.isFirstLogin) {
                          _context2.next = 9;
                          break;
                        }

                        return _context2.abrupt("return", {
                          error: 'Generating Key done!'
                        });

                      case 9:
                        name = (0, _utils.getFullName)(data.name);
                        email = "".concat(data.email);
                        passphrase = (0, _aes.generateRandomString)(100);
                        userData = {
                          name: name,
                          email: email,
                          passphrase: passphrase
                        };
                        return _context2.abrupt("return", {
                          userData: userData
                        });

                      case 14:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref.apply(this, arguments);
              };
            }())["catch"](_newPair.displayError));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fetchUserData.apply(this, arguments);
}

function createNewPairKeys(_x2) {
  return _createNewPairKeys.apply(this, arguments);
}

function _createNewPairKeys() {
  _createNewPairKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(userData) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new _gpgEncryptor["default"]({
              userIDs: [{
                name: userData.name,
                email: userData.email
              }],
              passphrase: userData.passphrase
            }).init());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _createNewPairKeys.apply(this, arguments);
}

function encryptGeneratedKeys(_x3, _x4) {
  return _encryptGeneratedKeys.apply(this, arguments);
}

function _encryptGeneratedKeys() {
  _encryptGeneratedKeys = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(encryptor, serverArmoredPubKey) {
    var unencryptedMessage, pubKey, encrypted;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            unencryptedMessage = JSON.stringify(encryptor.getArmoredKeys());
            _context5.next = 3;
            return _gpgEncryptor["default"].readArmoredPublicKey(serverArmoredPubKey);

          case 3:
            pubKey = _context5.sent;
            _context5.next = 6;
            return encryptor.encryptMessage(unencryptedMessage, pubKey);

          case 6:
            encrypted = _context5.sent;
            return _context5.abrupt("return", encrypted);

          case 8:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _encryptGeneratedKeys.apply(this, arguments);
}

function getServerPubKey(_x5) {
  return _getServerPubKey.apply(this, arguments);
}

function _getServerPubKey() {
  _getServerPubKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(url) {
    var response;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return fetch(url);

          case 2:
            response = _context6.sent;
            return _context6.abrupt("return", response.json());

          case 4:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getServerPubKey.apply(this, arguments);
}