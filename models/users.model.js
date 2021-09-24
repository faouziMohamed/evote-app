"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _lodash = require("lodash");

var _mongoose = require("mongoose");

var _utils = require("../utils/utils");

var userSchema = new _mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, 'User name is required'],
    maxLength: [50, 'User name must be less than 50 characters, got {VALUE}'],
    "default": ''
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    "default": ''
  },
  password: {
    type: String,
    required: [true, 'Password is required and must be at last 8 caracters'],
    minLength: [8, 'Password must be at least 8 characters'],
    select: false,
    "default": ''
  },
  name: {
    first: {
      type: String,
      required: true,
      "default": '',
      minLength: [2, 'First name must be at least 2 characters'],
      maxLength: [100, 'First name must be less than 100 characters']
    },
    last: {
      type: String,
      required: true,
      "default": '',
      minLength: [2, 'Last name must be at least 2 characters'],
      maxLength: [100, 'Last name must be less than 100 characters']
    }
  },
  cin: {
    type: Number,
    required: [true, 'CIN is required but nothing was specified'],
    unique: true
  },
  activationOrderNo: {
    type: Number,
    min: 0,
    "default": 0
  },
  activationDate: {
    type: Date,
    "default": Date.now
  },
  userType: {
    type: String,
    "default": 'voter'
  },
  role: {
    type: String,
    "default": 'user'
  },
  lang: {
    type: String,
    "enum": ['fr', 'en'],
    "default": 'en'
  },
  birthDate: {
    type: Date,
    required: true,
    "default": ''
  },
  isFirstLogin: {
    type: Boolean,
    "default": true
  },
  isPdg: {
    type: Boolean,
    "default": false
  },
  hasVoted: {
    type: Boolean,
    "default": false
  },
  isActivated: {
    type: Boolean,
    "default": false
  },
  isLocked: {
    type: Boolean,
    "default": false
  }
}, {
  timeStamp: true
});
userSchema.index({
  username: 1,
  email: 1,
  cin: 1
}, {
  unique: true
}); // Everytime a user is saved or the password is hashed

userSchema.pre('save', /*#__PURE__*/function () {
  var _setPasswordHash = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(next) {
    var user, password;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = this;

            if (user.isModified('password')) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", next());

          case 3:
            _context.prev = 3;
            _context.next = 6;
            return (0, _utils.hashPassword)(user.password);

          case 6:
            password = _context.sent;
            user.set({
              password: password
            });
            return _context.abrupt("return", next());

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](3);
            return _context.abrupt("return", next(_context.t0));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[3, 11]]);
  }));

  function setPasswordHash(_x) {
    return _setPasswordHash.apply(this, arguments);
  }

  return setPasswordHash;
}());
userSchema.pre('save', /*#__PURE__*/function () {
  var _lowerCaseEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(next) {
    var user, email;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            user = this;
            email = user.email;
            user.set({
              email: email.toLowerCase()
            });
            next();

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  function lowerCaseEmail(_x2) {
    return _lowerCaseEmail.apply(this, arguments);
  }

  return lowerCaseEmail;
}());
userSchema.pre('save', function capitaliseNames(next) {
  var user = this;

  if (user.isModified('name')) {
    user.name.first = (0, _lodash.startCase)((0, _lodash.toLower)(user.name.first));
    user.name.last = (0, _lodash.startCase)((0, _lodash.toLower)(user.name.last));
  }

  next();
});
userSchema.pre('save', function lowercaseusername(next) {
  var user = this;

  if (user.isModified('username')) {
    user.username.toLowerCase();
  }

  next();
});

userSchema.methods.comparePassword = /*#__PURE__*/function () {
  var _comparePassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(password) {
    var hashedPassword, isMatch;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            hashedPassword = this.password;
            _context3.next = 3;
            return _bcrypt["default"].compare(password, hashedPassword);

          case 3:
            isMatch = _context3.sent;
            return _context3.abrupt("return", isMatch);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  function comparePassword(_x3) {
    return _comparePassword.apply(this, arguments);
  }

  return comparePassword;
}();

var User = (0, _mongoose.model)('User', userSchema);
var _default = User;
exports["default"] = _default;