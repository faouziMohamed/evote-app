"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCandidatesInformations = exports.getCandidateInformations = exports.getCandidateInformationsByCIN = exports.getCandidateInformationsById = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _candidate = require("../utils/candidate.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var getDetails = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(candidate) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = candidate.user._id;
            _context.t1 = candidate._id;
            _context.t2 = "".concat(candidate.user.name.first, " ").concat(candidate.user.name.last);
            _context.t3 = candidate.user.email;
            _context.t4 = candidate.user.lang || 'en';
            _context.t5 = candidate.voiceCount;
            _context.t6 = _objectSpread;
            _context.t7 = {
              details: '',
              skills: []
            };
            _context.t8 = {
              details: '',
              skills: []
            };
            _context.t9 = candidate.depositionDate;
            _context.next = 12;
            return (0, _candidate.getCandidatePositionByID)(candidate._id);

          case 12:
            _context.t10 = _context.sent;
            _context.t11 = _context.t10 + 1;
            _context.t12 = {
              en: _context.t7,
              fr: _context.t8,
              depositionDate: _context.t9,
              position: _context.t11
            };
            _context.t13 = candidate.description;
            _context.t14 = (0, _context.t6)(_context.t12, _context.t13);
            return _context.abrupt("return", {
              uid: _context.t0,
              cid: _context.t1,
              name: _context.t2,
              email: _context.t3,
              lang: _context.t4,
              voiceCount: _context.t5,
              description: _context.t14
            });

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getDetails(_x) {
    return _ref.apply(this, arguments);
  };
}();

var getCandidateInformationsById = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var candidate;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _candidate.findCandidateByIdPopulate)(id, 'lang name email');

          case 2:
            candidate = _context2.sent;

            if (candidate) {
              _context2.next = 5;
              break;
            }

            throw new Error('Candidate not found');

          case 5:
            return _context2.abrupt("return", getDetails(candidate));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getCandidateInformationsById(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getCandidateInformationsById = getCandidateInformationsById;

var getCandidateInformationsByCIN = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cin) {
    var candidate;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _candidate.findCandidateByCINPopulate)(cin, 'lang name email');

          case 2:
            candidate = _context3.sent;

            if (candidate) {
              _context3.next = 5;
              break;
            }

            throw new Error('Candidate not found');

          case 5:
            return _context3.abrupt("return", getDetails(candidate));

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getCandidateInformationsByCIN(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getCandidateInformationsByCIN = getCandidateInformationsByCIN;

var getCandidateInformations = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(_ref4) {
    var cin, id;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cin = _ref4.cin, id = _ref4.id;
            return _context4.abrupt("return", id && getCandidateInformationsById(id) || cin && getCandidateInformationsByCIN(cin) || null);

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function getCandidateInformations(_x4) {
    return _ref5.apply(this, arguments);
  };
}();

exports.getCandidateInformations = getCandidateInformations;

var getAllCandidatesInformations = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    var candidates;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return (0, _candidate.findAllCandidatesPopulate)('lang name email');

          case 2:
            candidates = _context5.sent;
            return _context5.abrupt("return", Promise.all(candidates.map(getDetails)));

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function getAllCandidatesInformations() {
    return _ref6.apply(this, arguments);
  };
}();

exports.getAllCandidatesInformations = getAllCandidatesInformations;