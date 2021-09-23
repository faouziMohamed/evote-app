"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _auth = require("../../controllers/auth.controllers");

var _index = _interopRequireDefault(require("../../utils/emails/index.email"));

var _jwt = require("../../utils/lib/jwt.utils");

var _token = require("../../utils/token.utils");

var _users = require("../../utils/users.utils");

var tokenRouter = (0, _express.Router)();
tokenRouter.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var rToken, type, uid, existsUser, user;
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
            rToken = req.query.token;
            type = 'activation';
            _context.next = 9;
            return (0, _jwt.verifyToken)(rToken);

          case 9:
            _context.next = 11;
            return (0, _token.getUserIdFromToken)({
              token: rToken,
              type: type
            });

          case 11:
            uid = _context.sent;

            if (uid) {
              _context.next = 14;
              break;
            }

            throw new Error('Token not found, Retry the activation process');

          case 14:
            _context.next = 16;
            return (0, _users.existsUserById)(uid);

          case 16:
            existsUser = _context.sent;

            if (existsUser) {
              _context.next = 19;
              break;
            }

            throw new Error('User not found, Retry the activation process');

          case 19:
            user = (0, _users.updateUserById)(uid, {
              isActivated: true
            });
            req.user = user;
            return _context.abrupt("return", (0, _auth.newPairGET)(req, res));

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](0);

            if (!(_context.t0.name === 'TokenExpiredError')) {
              _context.next = 28;
              break;
            }

            return _context.abrupt("return", res.status(401).send({
              error: _context.t0.message,
              errorName: _context.t0.name,
              msg: 'Token expired, you need to restart the activation process'
            }));

          case 28:
            return _context.abrupt("return", res.status(401).send({
              error: _context.t0.message,
              errorName: _context.t0.name
            }));

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 24]]);
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

            return _context2.abrupt("return", res.redirect('/vote'));

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
            return (0, _index["default"])({
              user: user,
              msgType: 'activation'
            });

          case 19:
            return _context2.abrupt("return", res.status(200).send({
              data: 'A message with the activation link has been sent to your email,' + ' please check it in your inbox'
            }));

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", res.status(400).send({
              error: _context2.t0.message
            }));

          case 25:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 22]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = tokenRouter;
exports["default"] = _default;