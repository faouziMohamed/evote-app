"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _config = _interopRequireDefault(require("../../config/config"));

var _auth = require("../../controllers/auth.controllers");

var _activationStatus = require("../../data/auth/activation-status.cms");

var _index = _interopRequireDefault(require("../../utils/emails/index.email"));

var _jwt = require("../../utils/lib/jwt.utils");

var _token = require("../../utils/token.utils");

var _users = require("../../utils/users.utils");

var tokenRouter = (0, _express.Router)();
tokenRouter.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var rToken, _String$split, _String$split2, token, rtid, tid, tokenDoc, user, options, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;

            if (!req.user) {
              _context.next = 3;
              break;
            }

            return _context.abrupt("return", res.redirect('/vote'));

          case 3:
            if (req.query.token) {
              _context.next = 5;
              break;
            }

            throw new Error('No token provided');

          case 5:
            rToken = req.query.token; // rtoken format : token[tokenid] ↓ extract token and it ID

            _String$split = String(rToken).split('['), _String$split2 = (0, _slicedToArray2["default"])(_String$split, 2), token = _String$split2[0], rtid = _String$split2[1];
            tid = rtid === null || rtid === void 0 ? void 0 : rtid.replace(']', '');
            _context.next = 10;
            return (0, _jwt.verifyToken)(token);

          case 10:
            _context.next = 12;
            return (0, _token.findTokenByID)(tid);

          case 12:
            tokenDoc = _context.sent;

            if (tokenDoc !== null && tokenDoc !== void 0 && tokenDoc.userId) {
              _context.next = 15;
              break;
            }

            throw new Error('Token not found, Retry the activation process');

          case 15:
            _context.next = 17;
            return (0, _users.findUserById)(tokenDoc === null || tokenDoc === void 0 ? void 0 : tokenDoc.userId);

          case 17:
            user = _context.sent;

            if (user) {
              _context.next = 20;
              break;
            }

            throw new Error('User not found, Retry the activation process');

          case 20:
            req.user = user;
            options = {
              maxAge: _config["default"].session.expiry,
              httpOnly: true,
              secure: _config["default"].env === 'production'
            };
            data = JSON.stringify({
              UID: user._id,
              email: user.email,
              tid: tid
            });
            res.cookie('uif', data, options); // user information cookie

            return _context.abrupt("return", (0, _auth.updateInfoGET)(req, res));

          case 27:
            _context.prev = 27;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", handleActivationErrors(_context.t0, req, res));

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 27]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
tokenRouter.post('/request', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, email, cin, user;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;

            if (!req.user) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(200).json({
              error: 'You are already logged in',
              redirectTo: '/vote'
            }));

          case 3:
            _req$body = req.body, email = _req$body.email, cin = _req$body.cin;

            if (email) {
              _context2.next = 6;
              break;
            }

            throw new Error('Attending to send an email, but no email was provided');

          case 6:
            if (cin) {
              _context2.next = 8;
              break;
            }

            throw new Error('A CIN is expected but nothing was provided');

          case 8:
            _context2.next = 10;
            return (0, _users.findUserByEmail)(email);

          case 10:
            user = _context2.sent;

            if (user) {
              _context2.next = 13;
              break;
            }

            throw new Error('User not found');

          case 13:
            if (!(user !== null && user !== void 0 && user.isActivated)) {
              _context2.next = 15;
              break;
            }

            throw new Error('User already activated, please contact an admin for more support');

          case 15:
            if (!(Number(user === null || user === void 0 ? void 0 : user.cin) !== Number(cin))) {
              _context2.next = 17;
              break;
            }

            throw new Error('The combination of Email and CIN not found, ' + 'please make you sure you provided the right one');

          case 17:
            _context2.next = 19;
            return (0, _token.removeAllTokens)({
              userId: user._id
            });

          case 19:
            _context2.next = 21;
            return (0, _index["default"])({
              user: user,
              msgType: 'activation'
            });

          case 21:
            return _context2.abrupt("return", res.status(200).send({
              data: 'A message with the activation link has been sent to your email,' + ' please check it in your inbox'
            }));

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).send({
              error: _context2.t0.message
            }));

          case 27:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 24]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

function handleActivationErrors(error, req, res) {
  var errorTitle;
  var errorMessage;

  if (error.name === 'TokenExpiredError') {
    errorTitle = 'Token expired';
    errorMessage = 'Token expired, you need to restart the activation process';
  } else if (error.name === 'JsonWebTokenError') {
    errorTitle = 'Invalid token';
    errorMessage = 'You need to provide a valid token';
  } else {
    errorTitle = 'Error';
    errorMessage = error.message;
  }

  var pageData = (0, _activationStatus.getActivationStatusPageDataPageData)({
    pageTitle: errorTitle,
    errorMessage: errorMessage,
    layout: 'auth/layout'
  });

  var _req$flash = req.flash('error');

  var _req$flash2 = (0, _slicedToArray2["default"])(_req$flash, 1);

  pageData.error = _req$flash2[0];

  var _req$flash3 = req.flash('success');

  var _req$flash4 = (0, _slicedToArray2["default"])(_req$flash3, 1);

  pageData.success = _req$flash4[0];
  return res.render('auth/activation-status', pageData);
}

var _default = tokenRouter;
exports["default"] = _default;