"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserProfilePicture = getUserProfilePicture;
exports.hashPassword = hashPassword;
exports.readValueFromCookies = readValueFromCookies;
exports.invalidateCookie = invalidateCookie;
exports.isBrowser = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _cookie = _interopRequireDefault(require("cookie"));

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("../config/config"));

var isBrowser = function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
};

exports.isBrowser = isBrowser;

function getUserProfilePicture(id) {
  var profilePicture = _config["default"].USER_IMG_URL;

  var imgPath = _path["default"].resolve(_config["default"].IMG_DIR_PATH, "".concat(id));

  if ((0, _fs.existsSync)(imgPath)) {
    profilePicture = "".concat(_config["default"].IMG_DIR_URL, "/").concat(id);
  }

  return profilePicture;
}

function hashPassword() {
  return _hashPassword.apply(this, arguments);
}

function _hashPassword() {
  _hashPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var password,
        salt,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            password = _args.length > 0 && _args[0] !== undefined ? _args[0] : '';
            _context.next = 3;
            return _bcrypt["default"].genSalt(10);

          case 3:
            salt = _context.sent;
            return _context.abrupt("return", _bcrypt["default"].hash(password, salt));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _hashPassword.apply(this, arguments);
}

function readValueFromCookies(req, cookieName) {
  var _cookie$parse;

  var c = (_cookie$parse = _cookie["default"].parse(req.headers.cookie)) === null || _cookie$parse === void 0 ? void 0 : _cookie$parse[cookieName];
  return JSON.parse(c);
}

function invalidateCookie(res, cookieName) {
  res.cookie(cookieName, {}, {
    expires: new Date(Date.now() - 1)
  });
}