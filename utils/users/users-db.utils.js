"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyUserExists = verifyUserExists;
exports.getNewCin = getNewCin;
exports.deleteUser = exports.createUser = exports.existsUserByCIN = exports.existsUserByUsername = exports.existsUserByEmail = exports.existsUserById = exports.getCountUserActivated = exports.findAllUsers = exports.findUserByCIN = exports.findUserById = exports.findUserByUsername = exports.findUserByEmail = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = _interopRequireDefault(require("../../config/config"));

var _users = _interopRequireDefault(require("../../models/users.model"));

var _candidate = require("../candidate.utils");

var findUserByEmail = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(email) {
    var filter,
        password,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            password = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            return _context.abrupt("return", _users["default"].findOne({
              email: email
            }, password && '+password').select(filter).lean().exec());

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findUserByEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findUserByEmail = findUserByEmail;

var findUserByUsername = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(username) {
    var filter,
        password,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filter = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            password = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
            return _context2.abrupt("return", _users["default"].findOne({
              username: username
            }, password && '+password').select(filter).lean().exec());

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findUserByUsername(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findUserByUsername = findUserByUsername;

var findUserById = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
    var filter,
        password,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filter = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
            password = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : false;
            return _context3.abrupt("return", _users["default"].findById(id, password && '+password').select(filter).lean().exec());

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findUserById(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findUserById = findUserById;

var findUserByCIN = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(cin) {
    var filter,
        password,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filter = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
            password = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
            return _context4.abrupt("return", _users["default"].findOne({
              cin: cin
            }, password && '+password').select(filter).lean().exec());

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findUserByCIN(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findUserByCIN = findUserByCIN;

var findAllUsers = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var filter,
        password,
        _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
            password = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : false;
            return _context5.abrupt("return", _users["default"].find({}, password && '+password').select(filter).lean().exec());

          case 3:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findAllUsers() {
    return _ref5.apply(this, arguments);
  };
}();

exports.findAllUsers = findAllUsers;

var getCountUserActivated = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            return _context6.abrupt("return", _users["default"].find({
              accountActivated: true
            }).countDocuments().lean().exec());

          case 1:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function getCountUserActivated() {
    return _ref6.apply(this, arguments);
  };
}();

exports.getCountUserActivated = getCountUserActivated;

var existsUserById = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(_id) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _users["default"].exists({
              _id: _id
            }));

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function existsUserById(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.existsUserById = existsUserById;

var existsUserByEmail = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(email) {
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            return _context8.abrupt("return", _users["default"].exists({
              email: email
            }));

          case 1:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function existsUserByEmail(_x6) {
    return _ref8.apply(this, arguments);
  };
}();

exports.existsUserByEmail = existsUserByEmail;

var existsUserByUsername = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(username) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", _users["default"].exists({
              username: username
            }));

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function existsUserByUsername(_x7) {
    return _ref9.apply(this, arguments);
  };
}();

exports.existsUserByUsername = existsUserByUsername;

var existsUserByCIN = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(cin) {
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            return _context10.abrupt("return", _users["default"].exists({
              cin: cin
            }));

          case 1:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function existsUserByCIN(_x8) {
    return _ref10.apply(this, arguments);
  };
}();

exports.existsUserByCIN = existsUserByCIN;

function verifyUserExists(_x9) {
  return _verifyUserExists.apply(this, arguments);
}

function _verifyUserExists() {
  _verifyUserExists = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(_ref11) {
    var _id, email, username, cin;

    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _id = _ref11.id, email = _ref11.email, username = _ref11.username, cin = _ref11.cin;

            if (!_id) {
              _context13.next = 3;
              break;
            }

            return _context13.abrupt("return", existsUserById(_id));

          case 3:
            if (!email) {
              _context13.next = 5;
              break;
            }

            return _context13.abrupt("return", existsUserByEmail(email));

          case 5:
            if (!username) {
              _context13.next = 7;
              break;
            }

            return _context13.abrupt("return", existsUserByUsername(username));

          case 7:
            if (!cin) {
              _context13.next = 9;
              break;
            }

            return _context13.abrupt("return", existsUserByCIN(cin));

          case 9:
            throw new Error('No user to verify');

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _verifyUserExists.apply(this, arguments);
}

function getNewCin(_x10) {
  return _getNewCin.apply(this, arguments);
}

function _getNewCin() {
  _getNewCin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(UserModel) {
    var users, cin;
    return _regenerator["default"].wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return UserModel.find({}).sort({
              cin: -1
            }).limit(1).exec();

          case 2:
            users = _context14.sent;
            cin = users.length && Number(users[0].cin) + 1 || _config["default"].DEFAULT_CIN;
            return _context14.abrupt("return", cin);

          case 5:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14);
  }));
  return _getNewCin.apply(this, arguments);
}

var createUser = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(userData) {
    var user;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return _users["default"].create(userData);

          case 2:
            user = _context11.sent;

            if (user.userType === 'candidate') {
              (0, _candidate.createCandidate)(user);
            }

            return _context11.abrupt("return", user);

          case 5:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function createUser(_x11) {
    return _ref12.apply(this, arguments);
  };
}();

exports.createUser = createUser;

var deleteUser = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(_ref13) {
    var id, cin, username, email, query, user;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            id = _ref13.id, cin = _ref13.cin, username = _ref13.username, email = _ref13.email;
            query = {};

            if (!id) {
              _context12.next = 6;
              break;
            }

            query._id = id;
            _context12.next = 19;
            break;

          case 6:
            if (!cin) {
              _context12.next = 10;
              break;
            }

            query.cin = cin;
            _context12.next = 19;
            break;

          case 10:
            if (!username) {
              _context12.next = 14;
              break;
            }

            query.username = username;
            _context12.next = 19;
            break;

          case 14:
            if (!email) {
              _context12.next = 18;
              break;
            }

            query.email = email;
            _context12.next = 19;
            break;

          case 18:
            throw new Error('No user id, cin, username or email provided');

          case 19:
            _context12.next = 21;
            return _users["default"].findOneAndDelete(query).exec();

          case 21:
            user = _context12.sent;

            if (!((user === null || user === void 0 ? void 0 : user.userType) === 'candidate')) {
              _context12.next = 25;
              break;
            }

            _context12.next = 25;
            return (0, _candidate.deleteCandidateByUserId)(user._id);

          case 25:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function deleteUser(_x12) {
    return _ref14.apply(this, arguments);
  };
}();

exports.deleteUser = deleteUser;