"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserWithCallback = getUserWithCallback;
exports.readUserData = readUserData;
exports.readAndVerifyUserInput = readAndVerifyUserInput;
exports.getAllUsers = getAllUsers;
exports.getUserByCIN = exports.getUserByID = exports.getUserByUsername = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _authMsg = require("../data/auth/auth-msg.cms");

var _users = _interopRequireDefault(require("../models/users.model"));

var _utils = require("../public/js/lib/utils/utils");

var _aes = require("../utils/lib/aes.utils");

var _users2 = require("../utils/users.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getUserByUsername = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var filter,
        username,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            _context.prev = 1;
            username = req.params.username;

            if (username) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", function () {
              return res.status(400).json({
                error: (0, _authMsg.getAuthErrorMessage)('missingUsername')
              });
            });

          case 5:
            return _context.abrupt("return", (0, _users2.findUserByUsername)(username, filter));

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](1);
            return _context.abrupt("return", res.status(400).json({
              error: _context.t0.message
            }));

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 8]]);
  }));

  return function getUserByUsername(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.getUserByUsername = getUserByUsername;

var getUserByID = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var filter,
        id,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
            _context2.prev = 1;
            id = req.params.id;

            if (id) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", function () {
              return res.status(400).json({
                error: (0, _authMsg.getAuthErrorMessage)('missingID')
              });
            });

          case 5:
            return _context2.abrupt("return", (0, _users2.findUserById)(id, filter));

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);
            return _context2.abrupt("return", res.status(400).json({
              error: _context2.t0.message
            }));

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 8]]);
  }));

  return function getUserByID(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getUserByID = getUserByID;

var getUserByCIN = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var filter,
        cin,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filter = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
            _context3.prev = 1;
            cin = req.params.cin;

            if (cin) {
              _context3.next = 5;
              break;
            }

            return _context3.abrupt("return", function () {
              return res.status(400).json({
                error: (0, _authMsg.getAuthErrorMessage)('missingID')
              });
            });

          case 5:
            return _context3.abrupt("return", (0, _users2.findUserByCIN)(cin, filter));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](1);
            return _context3.abrupt("return", res.status(400).json({
              error: _context3.t0.message
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 8]]);
  }));

  return function getUserByCIN(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getUserByCIN = getUserByCIN;

function filterByQueryParameters(query) {
  var toKeep = {
    username: 1,
    email: 1,
    cin: 1
  };

  if (query !== null && query !== void 0 && query.displayable) {
    var _ref4 = [1, 1, 1, 1, 1];
    toKeep.name = _ref4[0];
    toKeep.role = _ref4[1];
    toKeep.isCandidate = _ref4[2];
    toKeep.isActivated = _ref4[3];
    toKeep.hasVoted = _ref4[4];
  } else {
    if (query !== null && query !== void 0 && query.name) toKeep.name = 1;
    if (query !== null && query !== void 0 && query.vt_status) toKeep.hasVoted = 1;
    if (query !== null && query !== void 0 && query.log_status) toKeep.isFirstLogin = 1;
    if (query !== null && query !== void 0 && query.utype) toKeep.isCandidate = 1;
    if (query !== null && query !== void 0 && query.acc_status) toKeep.isActivated = 1;
    if (query !== null && query !== void 0 && query.role) toKeep.role = 1;
    if (query !== null && query !== void 0 && query.pdg) toKeep.isPdg = 1;
  }

  return toKeep;
}

function getUserWithCallback(userFinderCB) {
  return /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
      var query, toKeep, user, data;
      return _regenerator["default"].wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              query = req.query;
              toKeep = filterByQueryParameters(query);
              _context4.next = 5;
              return userFinderCB(req, res, toKeep);

            case 5:
              user = _context4.sent;

              if (user) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", res.status(404).json({
                error: (0, _authMsg.getAuthErrorMessage)('userNotFound')
              }));

            case 8:
              if (!(typeof user === 'function')) {
                _context4.next = 10;
                break;
              }

              return _context4.abrupt("return", user());

            case 10:
              data = query !== null && query !== void 0 && query.displayable ? user : createDisplayableData(user);
              return _context4.abrupt("return", res.status(200).json({
                data: data
              }));

            case 14:
              _context4.prev = 14;
              _context4.t0 = _context4["catch"](0);
              return _context4.abrupt("return", res.status(400).json({
                error: _context4.t0.message
              }));

            case 17:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 14]]);
    }));

    return function (_x7, _x8) {
      return _ref5.apply(this, arguments);
    };
  }();
}

function createDisplayableData(user) {
  return {
    id: user._id,
    cin: user.cin,
    username: user.username,
    name: (0, _utils.getFullName)(user.name),
    email: user.email,
    role: user.role || 'user',
    userType: user.userType || 'voter',
    hasVoted: user.hasVoted,
    isActivated: user.isActivated
  };
}

function readUserData(_x9) {
  return _readUserData.apply(this, arguments);
}

function _readUserData() {
  _readUserData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req) {
    var genPassword,
        validated,
        _req$body,
        _req$body$role,
        role,
        _req$body$userType,
        userType,
        _readAndValidatePassw,
        password,
        cin,
        birthDate,
        data,
        _args5 = arguments;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            genPassword = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : true;
            validated = readAndvalidateWithRegex(req.body);
            _req$body = req.body, _req$body$role = _req$body.role, role = _req$body$role === void 0 ? 'user' : _req$body$role, _req$body$userType = _req$body.userType, userType = _req$body$userType === void 0 ? 'voter' : _req$body$userType;
            _readAndValidatePassw = readAndValidatePassword(req, genPassword), password = _readAndValidatePassw.password;
            _context5.next = 6;
            return (0, _users2.getNewCin)(_users["default"]);

          case 6:
            cin = _context5.sent;
            birthDate = new Date();
            data = _objectSpread(_objectSpread({
              cin: cin
            }, validated), {}, {
              role: role,
              userType: userType,
              birthDate: birthDate,
              password: password
            });
            return _context5.abrupt("return", data);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _readUserData.apply(this, arguments);
}

function readAndvalidateWithRegex(_ref6) {
  var username = _ref6.username,
      email = _ref6.email,
      lastname = _ref6.lastname,
      firstname = _ref6.firstname;

  if (!username || !email || !lastname || !firstname) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('missinParams'));
  }

  var usernameLower = username.toLowerCase().trim();
  var emailLower = email.toLowerCase().trim();
  var first = (0, _lodash.capitalize)((0, _utils.strip)(firstname).trim());
  var last = (0, _lodash.capitalize)((0, _utils.strip)(lastname).trim()); // test regexs

  if (!(0, _utils.getUsernameRegex)().test(usernameLower)) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('invalidUsername'));
  }

  if (!(0, _utils.getEmailRegex)().test(emailLower)) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('invalidEmail'));
  }

  if (!(0, _utils.getNameRegex)().test(first)) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('invalidFirstName'));
  }

  if (!(0, _utils.getNameRegex)().test(last)) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('invalidLastName'));
  }

  return {
    email: emailLower,
    username: usernameLower,
    name: {
      first: first,
      last: last
    }
  };
}

function readAndValidatePassword(req, genPassword) {
  if (genPassword) {
    return {
      password: (0, _aes.generateRandomString)(8)
    };
  }

  var password = req.body.password;
  if (!password) throw new Error((0, _authMsg.getAuthErrorMessage)('missingPassword'));

  if (!(0, _utils.getPasswordRegex)().test(password)) {
    throw new Error((0, _authMsg.getAuthErrorMessage)('passwordConstraint'));
  }

  return {
    password: password
  };
}

function readAndVerifyUserInput(_ref7) {
  var username = _ref7.username,
      email = _ref7.email;
  var lowercasedUsername = (username === null || username === void 0 ? void 0 : username.toLowerCase().trim()) || '';
  var lowercasedEmail = (email === null || email === void 0 ? void 0 : email.toLowerCase().trim()) || '';
  var notValid = lowercasedUsername && !(0, _utils.getUsernameRegex)().test(lowercasedUsername) || lowercasedEmail && !(0, _utils.getEmailRegex)().test(lowercasedEmail);

  if (notValid) {
    var reason = lowercasedUsername ? 'invalidUsername' : 'invalidEmail';
    throw new Error((0, _authMsg.getAuthErrorMessage)(reason));
  }

  return {
    username: lowercasedUsername,
    email: lowercasedEmail
  };
}

function getAllUsers(_x10, _x11) {
  return _getAllUsers.apply(this, arguments);
}

function _getAllUsers() {
  _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var query, toKeep, users, data;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            query = req.query;
            toKeep = filterByQueryParameters(query);
            _context6.next = 4;
            return (0, _users2.findAllUsers)(toKeep);

          case 4:
            users = _context6.sent;

            if (users !== null && users !== void 0 && users.length) {
              _context6.next = 7;
              break;
            }

            return _context6.abrupt("return", res.status(204).json({
              error: (0, _authMsg.getAuthErrorMessage)('emptyUserList')
            }));

          case 7:
            data = query !== null && query !== void 0 && query.displayable ? users.map(createDisplayableData) : users;
            return _context6.abrupt("return", res.status(200).json({
              data: data
            }));

          case 9:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _getAllUsers.apply(this, arguments);
}