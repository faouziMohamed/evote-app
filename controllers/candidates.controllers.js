"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllCandidatesInformations = exports.getCandidateInformations = exports.getCandidateInformationsByCIN = exports.getCandidateInformationsById = exports.getCandidatePositionByID = exports.incrementVoiceCount = exports.findAllCandidatesPopulate = exports.findAllCandidates = exports.findCandidateByCINPopulate = exports.findCandidateByCIN = exports.findCandidateByIdPopulate = exports.findCandidateById = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _candidates = _interopRequireDefault(require("../models/candidates.model"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var findCandidateById = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(id) {
    var filter,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            filter = _args.length > 1 && _args[1] !== undefined ? _args[1] : '';
            return _context.abrupt("return", _candidates["default"].findById(id, filter).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function findCandidateById(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.findCandidateById = findCandidateById;

var findCandidateByIdPopulate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id) {
    var populateFilter,
        _args2 = arguments;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            populateFilter = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : '';
            return _context2.abrupt("return", _candidates["default"].findById(id).populate({
              path: 'details',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function findCandidateByIdPopulate(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.findCandidateByIdPopulate = findCandidateByIdPopulate;

var findCandidateByCIN = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(cin) {
    var filter,
        _args3 = arguments;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            filter = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : '';
            return _context3.abrupt("return", _candidates["default"].findOne({
              cin: cin
            }, filter).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function findCandidateByCIN(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.findCandidateByCIN = findCandidateByCIN;

var findCandidateByCINPopulate = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(cin) {
    var populateFilter,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            populateFilter = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : '';
            return _context4.abrupt("return", _candidates["default"].findOne({
              cin: cin
            }).populate({
              path: 'details',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findCandidateByCINPopulate(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findCandidateByCINPopulate = findCandidateByCINPopulate;

var findAllCandidates = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            return _context5.abrupt("return", _candidates["default"].find().select('-__v').lean().exec());

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findAllCandidates() {
    return _ref5.apply(this, arguments);
  };
}();

exports.findAllCandidates = findAllCandidates;

var findAllCandidatesPopulate = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6() {
    var populateFilter,
        _args6 = arguments;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            populateFilter = _args6.length > 0 && _args6[0] !== undefined ? _args6[0] : '';
            return _context6.abrupt("return", _candidates["default"].find({}).populate({
              path: 'details',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findAllCandidatesPopulate() {
    return _ref6.apply(this, arguments);
  };
}();

exports.findAllCandidatesPopulate = findAllCandidatesPopulate;

var incrementVoiceCount = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(cin) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            return _context7.abrupt("return", _candidates["default"].findOneAndUpdate({
              cin: cin
            }, {
              $inc: {
                voiceCount: 1
              }
            }, {
              "new": true
            }).lean().exec());

          case 1:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function incrementVoiceCount(_x5) {
    return _ref7.apply(this, arguments);
  };
}();

exports.incrementVoiceCount = incrementVoiceCount;

var getCandidatePositionByID = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id) {
    var candidates;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return _candidates["default"].find().populate({
              path: 'details'
            }).sort({
              voiceCount: -1
            }).exec();

          case 2:
            candidates = _context8.sent;
            return _context8.abrupt("return", candidates.findIndex(function (c) {
              return String(c._id) === String(id);
            }));

          case 4:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function getCandidatePositionByID(_x6) {
    return _ref8.apply(this, arguments);
  };
}();

exports.getCandidatePositionByID = getCandidatePositionByID;

var getDetails = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(candidate) {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.t0 = candidate.details._id;
            _context9.t1 = candidate._id;
            _context9.t2 = "".concat(candidate.details.name.first, " ").concat(candidate.details.name.last);
            _context9.t3 = candidate.details.email;
            _context9.t4 = candidate.details.lang || 'en';
            _context9.t5 = candidate.voiceCount;
            _context9.t6 = _objectSpread;
            _context9.t7 = {
              details: '',
              skills: []
            };
            _context9.t8 = {
              details: '',
              skills: []
            };
            _context9.t9 = candidate.depositionDate;
            _context9.next = 12;
            return getCandidatePositionByID(candidate._id);

          case 12:
            _context9.t10 = _context9.sent;
            _context9.t11 = _context9.t10 + 1;
            _context9.t12 = {
              en: _context9.t7,
              fr: _context9.t8,
              depositionDate: _context9.t9,
              position: _context9.t11
            };
            _context9.t13 = candidate.description;
            _context9.t14 = (0, _context9.t6)(_context9.t12, _context9.t13);
            return _context9.abrupt("return", {
              uid: _context9.t0,
              cid: _context9.t1,
              name: _context9.t2,
              email: _context9.t3,
              lang: _context9.t4,
              voiceCount: _context9.t5,
              description: _context9.t14
            });

          case 18:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function getDetails(_x7) {
    return _ref9.apply(this, arguments);
  };
}();

var getCandidateInformationsById = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(id) {
    var candidate;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return findCandidateByIdPopulate(id, 'lang name email');

          case 2:
            candidate = _context10.sent;

            if (candidate) {
              _context10.next = 5;
              break;
            }

            throw new Error('Candidate not found');

          case 5:
            return _context10.abrupt("return", getDetails(candidate));

          case 6:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function getCandidateInformationsById(_x8) {
    return _ref10.apply(this, arguments);
  };
}();

exports.getCandidateInformationsById = getCandidateInformationsById;

var getCandidateInformationsByCIN = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(cin) {
    var candidate;
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return findCandidateByCINPopulate(cin, 'lang name email');

          case 2:
            candidate = _context11.sent;

            if (candidate) {
              _context11.next = 5;
              break;
            }

            throw new Error('Candidate not found');

          case 5:
            return _context11.abrupt("return", getDetails(candidate));

          case 6:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function getCandidateInformationsByCIN(_x9) {
    return _ref11.apply(this, arguments);
  };
}();

exports.getCandidateInformationsByCIN = getCandidateInformationsByCIN;

var getCandidateInformations = /*#__PURE__*/function () {
  var _ref13 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(_ref12) {
    var cin, id;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            cin = _ref12.cin, id = _ref12.id;
            return _context12.abrupt("return", id && getCandidateInformationsById(id) || cin && getCandidateInformationsByCIN(cin) || null);

          case 2:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function getCandidateInformations(_x10) {
    return _ref13.apply(this, arguments);
  };
}();

exports.getCandidateInformations = getCandidateInformations;

var getAllCandidatesInformations = /*#__PURE__*/function () {
  var _ref14 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13() {
    var candidates;
    return _regenerator["default"].wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return findAllCandidatesPopulate('lang name email');

          case 2:
            candidates = _context13.sent;
            return _context13.abrupt("return", Promise.all(candidates.map(getDetails)));

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));

  return function getAllCandidatesInformations() {
    return _ref14.apply(this, arguments);
  };
}();

exports.getAllCandidatesInformations = getAllCandidatesInformations;