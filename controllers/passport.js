"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePassportLocalStrategy = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _authMsg = require("../data/auth/auth-msg.cms");

var _users = _interopRequireDefault(require("../models/users.model"));

var loginVerification = function loginVerification(req, username, password, done) {
  _users["default"].findOne({
    username: username
  }, '+password', /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err, user) {
      var errorMsg;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", done(err));

            case 2:
              errorMsg = (0, _authMsg.getAuthErrorMessage)('invalidCredentials');

              if (user) {
                _context.next = 5;
                break;
              }

              return _context.abrupt("return", done(null, false, req.flash('error', errorMsg)));

            case 5:
              _context.next = 7;
              return user.comparePassword(password);

            case 7:
              if (_context.sent) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", done(null, false, req.flash('error', errorMsg)));

            case 9:
              return _context.abrupt("return", done(null, user));

            case 10:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());
};

_passport["default"].serializeUser(function (user, done) {
  done(null, user._id);
});

_passport["default"].deserializeUser(function (userId, done) {
  _users["default"].findById(userId, function (err, user) {
    done(err, user);
  });
});

var usePassportLocalStrategy = function usePassportLocalStrategy() {
  return _passport["default"].use('login', new _passportLocal.Strategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  }, loginVerification));
};

exports.usePassportLocalStrategy = usePassportLocalStrategy;