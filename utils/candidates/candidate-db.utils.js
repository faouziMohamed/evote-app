"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCandidatePositionByID = exports.incrementVoiceCount = exports.findAllCandidatesPopulate = exports.findAllCandidates = exports.findCandidateByCINPopulate = exports.findCandidateByCIN = exports.findCandidateByIdPopulate = exports.findCandidateById = exports.deleteCandidateByCin = exports.deleteCandidateByUserId = exports.deleteCandidate = exports.createCandidate = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _candidates = _interopRequireDefault(require("../../models/candidates.model"));

var createCandidate = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(user) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", _candidates["default"].create({
              user: user._id,
              cin: user.cin
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function createCandidate(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.createCandidate = createCandidate;

var deleteCandidate = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(candidateID) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _candidates["default"].findOneAndRemove({
              _id: candidateID
            }).exec());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function deleteCandidate(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.deleteCandidate = deleteCandidate;

var deleteCandidateByUserId = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userID) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", _candidates["default"].findOneAndRemove({
              user: userID
            }).exec());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function deleteCandidateByUserId(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.deleteCandidateByUserId = deleteCandidateByUserId;

var deleteCandidateByCin = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(cin) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", _candidates["default"].findOneAndRemove({
              cin: cin
            }).exec());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function deleteCandidateByCin(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.deleteCandidateByCin = deleteCandidateByCin;

var findCandidateById = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
    var filter,
        _args5 = arguments;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filter = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : '';
            return _context5.abrupt("return", _candidates["default"].findById(id, filter).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function findCandidateById(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

exports.findCandidateById = findCandidateById;

var findCandidateByIdPopulate = /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
    var populateFilter,
        _args6 = arguments;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            populateFilter = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : '';
            return _context6.abrupt("return", _candidates["default"].findById(id).populate({
              path: 'user',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));

  return function findCandidateByIdPopulate(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

exports.findCandidateByIdPopulate = findCandidateByIdPopulate;

var findCandidateByCIN = /*#__PURE__*/function () {
  var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(cin) {
    var filter,
        _args7 = arguments;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            filter = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : '';
            return _context7.abrupt("return", _candidates["default"].findOne({
              cin: cin
            }, filter).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function findCandidateByCIN(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

exports.findCandidateByCIN = findCandidateByCIN;

var findCandidateByCINPopulate = /*#__PURE__*/function () {
  var _ref8 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(cin) {
    var populateFilter,
        _args8 = arguments;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            populateFilter = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : '';
            return _context8.abrupt("return", _candidates["default"].findOne({
              cin: cin
            }).populate({
              path: 'user',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8);
  }));

  return function findCandidateByCINPopulate(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.findCandidateByCINPopulate = findCandidateByCINPopulate;

var findAllCandidates = /*#__PURE__*/function () {
  var _ref9 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9() {
    return _regenerator["default"].wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            return _context9.abrupt("return", _candidates["default"].find().select('-__v').lean().exec());

          case 1:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  }));

  return function findAllCandidates() {
    return _ref9.apply(this, arguments);
  };
}();

exports.findAllCandidates = findAllCandidates;

var findAllCandidatesPopulate = /*#__PURE__*/function () {
  var _ref10 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10() {
    var populateFilter,
        _args10 = arguments;
    return _regenerator["default"].wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            populateFilter = _args10.length > 0 && _args10[0] !== undefined ? _args10[0] : '';
            return _context10.abrupt("return", _candidates["default"].find({}).populate({
              path: 'user',
              select: populateFilter
            }).select('-__v').lean().exec());

          case 2:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  }));

  return function findAllCandidatesPopulate() {
    return _ref10.apply(this, arguments);
  };
}();

exports.findAllCandidatesPopulate = findAllCandidatesPopulate;

var incrementVoiceCount = /*#__PURE__*/function () {
  var _ref11 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(id) {
    return _regenerator["default"].wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            return _context11.abrupt("return", _candidates["default"].findByIdAndDelete(id, {
              $inc: {
                voiceCount: 1
              }
            }, {
              "new": true
            }).lean().exec());

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11);
  }));

  return function incrementVoiceCount(_x9) {
    return _ref11.apply(this, arguments);
  };
}();

exports.incrementVoiceCount = incrementVoiceCount;

var getCandidatePositionByID = /*#__PURE__*/function () {
  var _ref12 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(id) {
    var candidates;
    return _regenerator["default"].wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            _context12.next = 2;
            return _candidates["default"].find().populate({
              path: 'user'
            }).sort({
              voiceCount: -1
            }).exec();

          case 2:
            candidates = _context12.sent;
            return _context12.abrupt("return", candidates.findIndex(function (c) {
              return String(c._id) === String(id);
            }));

          case 4:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12);
  }));

  return function getCandidatePositionByID(_x10) {
    return _ref12.apply(this, arguments);
  };
}();

exports.getCandidatePositionByID = getCandidatePositionByID;