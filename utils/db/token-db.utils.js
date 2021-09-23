"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeAllTokens = exports.getUserIdFromToken = exports.existsToken = exports.getUserTokens = exports.createToken = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _token = _interopRequireDefault(require("../../models/token.model"));

var createToken = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var user, _ref$tokenData, tokenData;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            user = _ref.user, _ref$tokenData = _ref.tokenData, tokenData = _ref$tokenData === void 0 ? {
              token: '',
              tokenType: ''
            } : _ref$tokenData;
            return _context.abrupt("return", _token["default"].create({
              token: tokenData.token,
              type: tokenData.tokenType,
              userId: user._id
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createToken(_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.createToken = createToken;

var getUserTokens = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var userId;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            userId = _ref3.userId;
            return _context2.abrupt("return", _token["default"].find({
              userId: userId
            }).exec());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getUserTokens(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.getUserTokens = getUserTokens;

var existsToken = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(_ref5) {
    var token;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            token = _ref5.token;
            return _context3.abrupt("return", _token["default"].exists({
              token: token
            }));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function existsToken(_x3) {
    return _ref6.apply(this, arguments);
  };
}();

exports.existsToken = existsToken;

var getUserIdFromToken = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref7) {
    var token, type, doc;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            token = _ref7.token, type = _ref7.type;

            if (type) {
              _context4.next = 3;
              break;
            }

            throw new Error('Token type is required');

          case 3:
            _context4.next = 5;
            return _token["default"].findOne({
              token: token,
              type: type
            }).lean().exec();

          case 5:
            doc = _context4.sent;

            if (doc) {
              _context4.next = 8;
              break;
            }

            throw new Error('Token not found');

          case 8:
            return _context4.abrupt("return", doc.userId);

          case 9:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getUserIdFromToken(_x4) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getUserIdFromToken = getUserIdFromToken;

var removeAllTokens = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(_ref9) {
    var userId;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            userId = _ref9.userId;
            return _context5.abrupt("return", _token["default"].deleteMany({
              userId: userId
            }).exec());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function removeAllTokens(_x5) {
    return _ref10.apply(this, arguments);
  };
}();

exports.removeAllTokens = removeAllTokens;