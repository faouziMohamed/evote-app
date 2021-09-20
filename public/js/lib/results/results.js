"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.readResultsData = readResultsData;
exports.getResultsData = getResultsData;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function readResultsData() {
  return _readResultsData.apply(this, arguments);
}

function _readResultsData() {
  _readResultsData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var formater,
        data,
        _args = arguments;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            formater = _args.length > 0 && _args[0] !== undefined ? _args[0] : defaultFormatter;
            _context.next = 3;
            return getResultsData();

          case 3:
            data = _context.sent;
            return _context.abrupt("return", formater(data.votes));

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _readResultsData.apply(this, arguments);
}

function getResultsData() {
  return _getResultsData.apply(this, arguments);
}

function _getResultsData() {
  _getResultsData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var ROOT,
        response,
        _yield$response$json,
        data,
        _args2 = arguments;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            ROOT = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : '';
            _context2.next = 3;
            return fetch("".concat(ROOT, "/api/votes/results/results.json"));

          case 3:
            response = _context2.sent;
            _context2.next = 6;
            return response.json();

          case 6:
            _yield$response$json = _context2.sent;
            data = _yield$response$json.data;
            return _context2.abrupt("return", data);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getResultsData.apply(this, arguments);
}

function defaultFormatter(data) {
  var results = {
    names: [],
    votes: []
  };
  makeSureArraySameSize(data, results);
  data.forEach(function (_ref) {
    var name = _ref.name,
        voteCounts = _ref.voteCounts;
    // Name longer than 1 word, use first letter of the first
    // name and keep unchanged the rest
    results.names.push(name.replace(/^(\w).+\w\s/, '$1. '));

    for (var i = 0; i < voteCounts.length; i++) {
      results.votes[i].data.push(voteCounts[i].count);
    }
  });
  return results;
}

function makeSureArraySameSize(data, results) {
  var _data$, _data$$voteCounts, _results$votes;

  if (!(data !== null && data !== void 0 && data.length)) throw new Error('Empty data not allowed!');
  var voiceCountLength = (_data$ = data[0]) === null || _data$ === void 0 ? void 0 : (_data$$voteCounts = _data$.voteCounts) === null || _data$$voteCounts === void 0 ? void 0 : _data$$voteCounts.length;
  var resultsLength = results === null || results === void 0 ? void 0 : (_results$votes = results.votes) === null || _results$votes === void 0 ? void 0 : _results$votes.length;

  if (voiceCountLength > resultsLength) {
    var limit = voiceCountLength - resultsLength;

    for (var index = 0; index < limit; index++) {
      results.votes.push({
        name: "Round ".concat(index + 2),
        data: []
      });
    }
  }
}