"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _candidates = _interopRequireDefault(require("./candidates.router"));

var _results = _interopRequireDefault(require("./results.router"));

var _votes = _interopRequireDefault(require("./votes.router"));

// ALl routes for connected users except the home page
var connectedRouter = new _express.Router();
(0, _results["default"])(connectedRouter);
(0, _candidates["default"])(connectedRouter);
(0, _votes["default"])(connectedRouter);
var _default = connectedRouter;
exports["default"] = _default;