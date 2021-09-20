"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBeforeLogin = checkBeforeLogin;
exports.routeProtecter = exports.newPairGET = exports.registerPOST = exports.registerGET = exports.loginPOST = exports.loginGET = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("../config/config"));

var _activate = require("../data/auth/activate.cms");

var _authMsg = require("../data/auth/auth-msg.cms");

var _login = require("../data/auth/login.cms");

var _newPaire = require("../data/auth/newPaire.cms");

var _users = require("../utils/users.utils");

var _users2 = require("./users.controllers");

var loginGET = function loginGET(req, res) {
  var pageData = (0, _login.getLoginPageData)({
    user: req.user,
    layout: 'auth/layout'
  });

  var _req$flash = req.flash('error');

  var _req$flash2 = (0, _slicedToArray2["default"])(_req$flash, 1);

  pageData.error = _req$flash2[0];

  var _req$flash3 = req.flash('success');

  var _req$flash4 = (0, _slicedToArray2["default"])(_req$flash3, 1);

  pageData.success = _req$flash4[0];
  res.render('auth/login', pageData);
};

exports.loginGET = loginGET;

var loginPOST = function loginPOST(req, res, next) {
  var callBack = checkBeforeLogin(req, res, next);

  _passport["default"].authenticate('login', callBack)(req, res, next);
};

exports.loginPOST = loginPOST;

var registerGET = function registerGET(req, res) {
  var pageData = (0, _activate.getActivatePageData)({
    user: req.user,
    layout: 'auth/layout'
  });

  var _req$flash5 = req.flash('error');

  var _req$flash6 = (0, _slicedToArray2["default"])(_req$flash5, 1);

  pageData.error = _req$flash6[0];

  var _req$flash7 = req.flash('success');

  var _req$flash8 = (0, _slicedToArray2["default"])(_req$flash7, 1);

  pageData.success = _req$flash8[0];
  res.render('auth/register', pageData);
};

exports.registerGET = registerGET;

var registerPOST = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, username, email, alreadyUsed, userData;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$body = req.body, username = _req$body.username, email = _req$body.email;
            _context.next = 4;
            return isFieldAlreadyUsed({
              username: username,
              email: email
            });

          case 4:
            alreadyUsed = _context.sent;

            if (!alreadyUsed) {
              _context.next = 8;
              break;
            }

            req.flash('error', (0, _authMsg.getAuthErrorMessage)(alreadyUsed));
            return _context.abrupt("return", res.redirect('/register'));

          case 8:
            _context.next = 10;
            return (0, _users2.readUserData)(req, false);

          case 10:
            userData = _context.sent;
            userData.role = 'admin';
            userData.isActivated = true;
            _context.next = 15;
            return (0, _users.createUser)(userData);

          case 15:
            req.flash('success', (0, _authMsg.getAuthSuccessMessage)('registrationSuccess'));
            return _context.abrupt("return", res.redirect('/login'));

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(400).json(_context.t0.message));

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 19]]);
  }));

  return function registerPOST(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.registerPOST = registerPOST;

var newPairGET = function newPairGET(req, res) {
  var pageData = (0, _newPaire.getNewPairPageData)({
    user: req.user,
    isNewPaire_page: true,
    layout: 'auth/layout'
  });

  var _req$flash9 = req.flash('error');

  var _req$flash10 = (0, _slicedToArray2["default"])(_req$flash9, 1);

  pageData.error = _req$flash10[0];

  var _req$flash11 = req.flash('success');

  var _req$flash12 = (0, _slicedToArray2["default"])(_req$flash11, 1);

  pageData.success = _req$flash12[0];
  pageData.user = req.user;
  res.render('auth/new-pair', pageData);
};

exports.newPairGET = newPairGET;

var routeProtecter = function routeProtecter(req, res, next) {
  var freePath = ['/api/users/verify'];

  var isProtectedPath = function isProtectedPath(path) {
    return freePath.some(function (p) {
      return !path.startsWith(p);
    });
  };

  var fn = next;

  if (isProtectedPath(req.path)) {
    fn = !req.user ? function () {
      return useUnprotectedPath(req, res, next);
    } : function () {
      return useProtectedPath(req, res, next);
    };
  }

  return fn();
};

exports.routeProtecter = routeProtecter;

function useUnprotectedPath(req, res, next) {
  var fn = next;
  var authPath = ['/login', '/activate', '/register'];

  var isAuthPath = function isAuthPath(path) {
    return authPath.some(function (p) {
      return path.startsWith(p);
    });
  };

  if (!isAuthPath(req.path)) fn = function fn() {
    return res.status(307).redirect('/login');
  };
  return fn();
}

function useProtectedPath(req, res, next) {
  var authPath = ['/login', '/activate', '/register'];
  var adminPath = ['/admin', '/api/admin'];
  var isAdmin = req.user.isAdmin;

  var redirectTo = function redirectTo(path) {
    return res.status(307).redirect(path);
  };

  var isAuthPath = function isAuthPath(path) {
    return authPath.some(function (p) {
      return path.startsWith(p);
    });
  };

  var isAdminPath = function isAdminPath(path) {
    return adminPath.some(function (p) {
      return path.startsWith(p);
    });
  };

  var fn = next;
  if (isAuthPath(req.url)) fn = function fn() {
    return redirectTo('/vote');
  };else if (!isAdmin && isAdminPath(req.path)) {
    var error = (0, _authMsg.getAuthErrorMessage)('onlyAdminAllowed');

    fn = function fn() {
      return res.status(401).json({
        error: error
      });
    };
  }
  return fn();
}

function isFieldAlreadyUsed(_x3) {
  return _isFieldAlreadyUsed.apply(this, arguments);
}

function _isFieldAlreadyUsed() {
  _isFieldAlreadyUsed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var username, email, userFound;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            username = _ref2.username, email = _ref2.email;
            _context2.next = 3;
            return (0, _users.existsUserByUsername)(username);

          case 3:
            userFound = _context2.sent;

            if (!userFound) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", 'usernameUsed');

          case 6:
            _context2.next = 8;
            return (0, _users.existsUserByEmail)(email);

          case 8:
            userFound = _context2.sent;

            if (!userFound) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", 'emailUsed');

          case 11:
            return _context2.abrupt("return", false);

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _isFieldAlreadyUsed.apply(this, arguments);
}

function checkBeforeLogin(req, res, next) {
  return function logInUser(err, user, info) {
    if (err) return next(err);

    if (!user) {
      handleNoValuesPassed(info, req);
      return res.status(307).redirect('/login');
    }

    return req.logIn(user, function (error) {
      if (error) return res.status(307).redirect('/login');
      var options = {
        expires: _config["default"].session.expires,
        httpOnly: false,
        secure: false
      };
      var data = JSON.stringify({
        UID: user.id,
        username: user.username
      });
      res.cookie('ps', data, options);
      return res.status(307).redirect(user.isFirstLogin ? '/new-pair' : '/vote');
    });
  };
}

function handleNoValuesPassed(info, req) {
  if (info) {
    var _req$body2 = req.body,
        username = _req$body2.username,
        password = _req$body2.password;
    var message;

    if (!username && !password) {
      message = (0, _authMsg.getAuthErrorMessage)('requiredFields');
    } else {
      message = !username ? (0, _authMsg.getAuthErrorMessage)('username') : (0, _authMsg.getAuthErrorMessage)('password');
    }

    req.flash('error', message);
  }
}