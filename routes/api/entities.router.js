"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _index = require("../../controllers/entities/index.entities");

var _users = require("../../controllers/entities/users.entities");

var _authMsg = require("../../data/auth/auth-msg.cms");

var _common = require("../../data/common.cms");

/* Router with root /api/keys/ */
// Handle routes from '/api/keys/{server,countcenter|co, valcenter|vc}
var router = new _express.Router();

function getEntityPublicKey(_x, _x2) {
  return _getEntityPublicKey.apply(this, arguments);
}

function _getEntityPublicKey() {
  _getEntityPublicKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var entityName, publicKey;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            entityName = req.params.entityName;
            _context3.next = 4;
            return (0, _index.getEntityArmoredPublicKey)(entityName.toLowerCase());

          case 4:
            publicKey = _context3.sent;
            res.status(200).json({
              data: publicKey
            });
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            res.status(500).json({
              error: _context3.t0.message
            });

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _getEntityPublicKey.apply(this, arguments);
}

router.route('/public/:entityName').get(getEntityPublicKey).post(getEntityPublicKey); // handle the case that no value was provided

router.route(['/user/id/', '/user/cin/', '/user/name/']).post(function (req, res) {
  res.status(400).json({
    error: (0, _authMsg.getAuthErrorMessage)('noValuePassed')
  });
}); // Handle routes from '/api/keys/user/{id/:id, name/:name, cin/:cin}'

/**
 * Save user GPG keys to the database, require passed data to be encrypted
 * with the server gpg public key
 */

router.route(['/user/id/:id', '/user/cin/:cin', '/user/name/:username']).post( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              (0, _users.saveUserKeys)(req, res);
            } catch (err) {
              res.status(400).json({
                error: (0, _common.getErrorMessage)('reqErrors')
              });
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());
/**
 * When user ask to the server to give him back it public and private key and
 * the passphrase, the user must be authenticated and send with the request a
 * AES key to encrypt data the response
 */

router.route(['/all/user/id/:id', '/all/user/name/:name', '/all/user/cin/:cin']).post( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _users.getKeys)(req, res);

          case 3:
            _context2.next = 8;
            break;

          case 5:
            _context2.prev = 5;
            _context2.t0 = _context2["catch"](0);
            res.status(400).json({
              error: _context2.t0.message
            });

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 5]]);
  }));

  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());
router.route('/');
var _default = router;
exports["default"] = _default;