"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _config = _interopRequireDefault(require("../config/config"));

var tokenSchema = new _mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    "enum": ['activation', 'resetPassword']
  }
}, {
  timestamps: true
});
tokenSchema.index({
  createdAt: 1
}, {
  expires: _config["default"].DB_TOKEN_EXPIRY
});
var Token = (0, _mongoose.model)('Token', tokenSchema);
var _default = Token;
exports["default"] = _default;