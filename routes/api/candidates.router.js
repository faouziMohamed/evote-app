"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _candidates = require("../../controllers/candidates.controllers");

/* Router with root /api/candidates/ */
var routerAPI = (0, _express.Router)();
routerAPI.route(['/info/id/:id', '/info/cin/:cin']).get( /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$params, id, cin;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _req$params = req.params, id = _req$params.id, cin = _req$params.cin;
            _context.t0 = res.status(200);
            _context.next = 5;
            return (0, _candidates.getCandidateInformations)({
              id: id,
              cin: cin
            });

          case 5:
            _context.t1 = _context.sent;
            _context.t2 = {
              data: _context.t1
            };

            _context.t0.json.call(_context.t0, _context.t2);

            _context.next = 13;
            break;

          case 10:
            _context.prev = 10;
            _context.t3 = _context["catch"](0);
            res.status(500).json({
              error: "Error getting candidate informations : ==> ".concat(_context.t3)
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 10]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
routerAPI.route('/info/').get( /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.t0 = res.status(200);
            _context2.next = 4;
            return (0, _candidates.getAllCandidatesInformations)();

          case 4:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              data: _context2.t1
            };

            _context2.t0.json.call(_context2.t0, _context2.t2);

            _context2.next = 12;
            break;

          case 9:
            _context2.prev = 9;
            _context2.t3 = _context2["catch"](0);
            res.status(500).json({
              error: "Error getting All candidate informations : ==> ".concat(_context2.t3)
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 9]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
var _default = routerAPI;
exports["default"] = _default;