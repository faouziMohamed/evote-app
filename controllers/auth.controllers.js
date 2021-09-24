"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkBeforeLogin = checkBeforeLogin;
exports.routeProtecter = exports.updateInfoPOST = exports.updateInfoGET = exports.activateGET = exports.newPairGET = exports.registerPOST = exports.registerGET = exports.loginPOST = exports.loginGET = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _cookie = _interopRequireDefault(require("cookie"));

var _passport = _interopRequireDefault(require("passport"));

var _config = _interopRequireDefault(require("../config/config"));

var _activate = require("../data/auth/activate.cms");

var _authMsg = require("../data/auth/auth-msg.cms");

var _login = require("../data/auth/login.cms");

var _newPaire = require("../data/auth/newPaire.cms");

var _register = require("../data/auth/register.cms");

var _updateInfo = require("../data/auth/update-info.cms");

var _token = require("../utils/token.utils");

var _users = require("../utils/users.utils");

var _utils = require("../utils/utils");

var _users2 = require("./users.controllers");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
  var pageData = (0, _register.getRegisterPageData)({
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
  if (!(req !== null && req !== void 0 && req.user.isFirstLogin)) return res.redirect('/vote');
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
  return res.render('auth/new-pair', pageData);
};

exports.newPairGET = newPairGET;

var activateGET = function activateGET(req, res) {
  var pageData = (0, _activate.getActivatePageData)({
    isNewPaire_page: true,
    layout: 'auth/layout'
  });

  var _req$flash13 = req.flash('error');

  var _req$flash14 = (0, _slicedToArray2["default"])(_req$flash13, 1);

  pageData.error = _req$flash14[0];

  var _req$flash15 = req.flash('success');

  var _req$flash16 = (0, _slicedToArray2["default"])(_req$flash15, 1);

  pageData.success = _req$flash16[0];
  res.render('auth/activate', pageData);
};

exports.activateGET = activateGET;

var updateInfoGET = function updateInfoGET(req, res) {
  var _cookie$parse;

  var c = (_cookie$parse = _cookie["default"].parse(req.headers.cookie)) === null || _cookie$parse === void 0 ? void 0 : _cookie$parse.uif;
  if (!c) return res.redirect('/activate');
  var pageData = (0, _updateInfo.getUpdateInfoPageData)({
    user: req.user,
    layout: 'auth/layout'
  });

  var _req$flash17 = req.flash('error');

  var _req$flash18 = (0, _slicedToArray2["default"])(_req$flash17, 1);

  pageData.error = _req$flash18[0];

  var _req$flash19 = req.flash('success');

  var _req$flash20 = (0, _slicedToArray2["default"])(_req$flash19, 1);

  pageData.success = _req$flash20[0];
  return res.render('auth/update-info', pageData);
};

exports.updateInfoGET = updateInfoGET;

var updateInfoPOST = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var uifCookie, id, email, tid, tokDoc, userData, alreadyUsed, tokUrl, _readAndValidatePassw, password;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            uifCookie = (0, _utils.readValueFromCookies)(req, 'uif');
            id = uifCookie.UID, email = uifCookie.email, tid = uifCookie.tid;

            if (id) {
              _context2.next = 6;
              break;
            }

            req.flash('error', (0, _authMsg.getAuthErrorMessage)('missingID'));
            return _context2.abrupt("return", res.redirect('/activate'));

          case 6:
            _context2.next = 8;
            return (0, _token.getToken)({
              userId: id,
              type: 'activation'
            });

          case 8:
            tokDoc = _context2.sent;

            if (!(String(tid) !== String(tokDoc._id))) {
              _context2.next = 12;
              break;
            }

            req.flash('error', (0, _authMsg.getAuthErrorMessage)('invalidToken'));
            return _context2.abrupt("return", res.redirect('/activate'));

          case 12:
            userData = (0, _users2.readAndvalidateWithRegex)(_objectSpread(_objectSpread({}, req.body), {}, {
              email: email
            }));
            _context2.next = 15;
            return isFieldAlreadyUsed(_objectSpread(_objectSpread({}, userData), {}, {
              email: null
            }));

          case 15:
            alreadyUsed = _context2.sent;

            if (!alreadyUsed) {
              _context2.next = 20;
              break;
            }

            tokUrl = "/api/activate/?token=".concat(tokDoc.token, "[").concat(tid, "]");
            req.flash('error', (0, _authMsg.getAuthErrorMessage)(alreadyUsed));
            return _context2.abrupt("return", res.redirect(tokUrl));

          case 20:
            _readAndValidatePassw = (0, _users2.readAndValidatePassword)(req, false), password = _readAndValidatePassw.password;
            userData.isActivated = true;
            _context2.next = 24;
            return (0, _utils.hashPassword)(password);

          case 24:
            userData.password = _context2.sent;
            _context2.next = 27;
            return (0, _users.updateUserById)(id, userData);

          case 27:
            (0, _utils.invalidateCookie)(res, 'uif');
            req.flash('success', (0, _authMsg.getAuthSuccessMessage)('updateSuccess'));
            return _context2.abrupt("return", res.redirect('/login'));

          case 32:
            _context2.prev = 32;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).json(_context2.t0.message));

          case 35:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 32]]);
  }));

  return function updateInfoPOST(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.updateInfoPOST = updateInfoPOST;

var routeProtecter = function routeProtecter(req, res, next) {
  var freePath = ['/update-info', '/api/users/verify', '/api/activate'];

  var isFreePath = function isFreePath(path) {
    return freePath.some(function (p) {
      return path.startsWith(p);
    });
  };

  var fn = next;

  if (!isFreePath(req.path)) {
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
    return res.redirect('/login');
  };
  return fn();
}

function useProtectedPath(req, res, next) {
  var authPath = ['/login', '/activate', '/register'];
  var adminPath = ['/admin', '/api/admin'];
  var role = req.user.role;

  var redirectTo = function redirectTo(path) {
    return res.redirect(path);
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
  };else if (role !== 'admin' && isAdminPath(req.path)) {
    var error = (0, _authMsg.getAuthErrorMessage)('onlyAdminAllowed');

    fn = function fn() {
      return res.status(401).json({
        error: error
      });
    };
  }
  return fn();
}

function isFieldAlreadyUsed(_x5) {
  return _isFieldAlreadyUsed.apply(this, arguments);
}

function _isFieldAlreadyUsed() {
  _isFieldAlreadyUsed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref3) {
    var _ref3$username, username, _ref3$email, email;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3$username = _ref3.username, username = _ref3$username === void 0 ? '' : _ref3$username, _ref3$email = _ref3.email, email = _ref3$email === void 0 ? '' : _ref3$email;
            _context3.t0 = username;

            if (!_context3.t0) {
              _context3.next = 6;
              break;
            }

            _context3.next = 5;
            return (0, _users.existsUserByUsername)(username);

          case 5:
            _context3.t0 = _context3.sent;

          case 6:
            if (!_context3.t0) {
              _context3.next = 8;
              break;
            }

            return _context3.abrupt("return", 'usernameUsed');

          case 8:
            _context3.t1 = email;

            if (!_context3.t1) {
              _context3.next = 13;
              break;
            }

            _context3.next = 12;
            return (0, _users.existsUserByEmail)(email);

          case 12:
            _context3.t1 = _context3.sent;

          case 13:
            if (!_context3.t1) {
              _context3.next = 15;
              break;
            }

            return _context3.abrupt("return", 'emailUsed');

          case 15:
            return _context3.abrupt("return", false);

          case 16:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _isFieldAlreadyUsed.apply(this, arguments);
}

function checkBeforeLogin(req, res, next) {
  return function logInUser(err, user, info) {
    if (err) return next(err);

    if (!user) {
      handleNoValuesPassed(info, req);
      return res.redirect('/login');
    }

    return req.logIn(user, function (error) {
      if (error) return res.redirect('/login');
      var options = {
        maxAge: _config["default"].session.expiry,
        httpOnly: false,
        secure: false
      };
      var data = JSON.stringify({
        UID: user.id,
        username: user.username
      });
      res.cookie('ps', data, options);
      return res.redirect(user.isFirstLogin ? '/new-pair' : '/vote');
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