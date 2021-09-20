"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _users = require("../../controllers/users.controllers");

var _authMsg = require("../../data/auth/auth-msg.cms");

var _users2 = require("../../utils/users.utils");

/* PATH: /api/users/ */
var usersAPIRouter = (0, _express.Router)(); // PATH: /api/users/all

usersAPIRouter.route('/all').get( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              (0, _users.getAllUsers)(req, res);
            } catch (error) {
              res.status(400).json({
                error: error.message
              });
            }

          case 1:
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
/** value was not provided in :
 * /api/users/:cin || /api/users/:id || /api/users/:username ||
 * /api/users/verify/username/ || /api/users/verify/email/ */

usersAPIRouter.route(['/cin/', '/id', '/username', '/verify/username/', '/verify/email/']).get(function (req, res) {
  res.status(400).json({
    error: (0, _authMsg.getAuthErrorMessage)('noValuePassed')
  });
}); // PATH: /api/users/cin/:cin || /api/users/id/:id || /api/users/username/:username

usersAPIRouter.route(['/cin/:cin', '/id/:id', '/username/:username']).get( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$params, cin, id, callback;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _req$params = req.params, cin = _req$params.cin, id = _req$params.id;
            callback = _users.getUserByCIN;
            if (!cin) callback = id ? _users.getUserByID : _users.getUserByUsername;
            _context2.next = 6;
            return (0, _users.getUserWithCallback)(callback)(req, res);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              error: _context2.t0.message
            });

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); // /api/users/verify/username/ || /api/users/verify/email/

usersAPIRouter.route(['/verify/username/:username', '/verify/email/:email']).get( /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _readAndVerifyUserInp, username, email, isUserExists;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _readAndVerifyUserInp = (0, _users.readAndVerifyUserInput)(req.params), username = _readAndVerifyUserInp.username, email = _readAndVerifyUserInp.email;
            _context3.next = 4;
            return (0, _users2.verifyUserExists)({
              username: username,
              email: email
            });

          case 4:
            isUserExists = _context3.sent;
            return _context3.abrupt("return", res.status(200).json({
              data: isUserExists
            }));

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", res.status(400).json({
              error: _context3.t0.message
            }));

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = usersAPIRouter;
exports["default"] = _default;