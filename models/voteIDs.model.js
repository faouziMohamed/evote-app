"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.findVoteIDById = exports.getNewVoteID = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _config = require("../config/config");

var voteIDschema = new _mongoose.Schema({
  userID: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timeStamp: true
});
voteIDschema.index({
  _id: 1,
  userID: 1
}, {
  unique: true
});
var VoteIDs = (0, _mongoose.model)('VoteIDs', voteIDschema);

var addNewVoteID = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(userID) {
    var voteID;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            voteID = new VoteIDs({
              userID: userID
            });
            _context.next = 3;
            return voteID.save();

          case 3:
            (0, _config.debug)('New vote Id added', voteID._id);
            return _context.abrupt("return", voteID._id);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function addNewVoteID(_x) {
    return _ref.apply(this, arguments);
  };
}();

var insertOneOrThrowError = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(userID) {
    var voteID;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return VoteIDs.findOne({
              userID: userID
            }).populate('userID', {
              hasVoted: 1
            }).lean().exec();

          case 2:
            voteID = _context2.sent;

            if (voteID) {
              _context2.next = 5;
              break;
            }

            return _context2.abrupt("return", addNewVoteID(userID));

          case 5:
            if (voteID.userID.hasVoted) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", voteID._id);

          case 7:
            throw new Error('You cannot vote a second time! If you retry again you will be banned');

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function insertOneOrThrowError(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
/**
 * @async
 * Generate and return a vote ID for the user ID passed in the parameter.
 * - if no voteID is associated with the user:
 *   - generate a new voteID and return it
 * - if a voteID is already associated with the user:
 *   - return that id if user has not yet voted
 *   - Throw an error if user has already voted
 * @param {string} userID
 * @returns {string} voteID
 * @throws {Error}
 */


var getNewVoteID = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(userID) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", insertOneOrThrowError(userID));

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function getNewVoteID(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

exports.getNewVoteID = getNewVoteID;

var findVoteIDById = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", VoteIDs.findById(id).lean().exec());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function findVoteIDById(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

exports.findVoteIDById = findVoteIDById;
var _default = VoteIDs;
exports["default"] = _default;