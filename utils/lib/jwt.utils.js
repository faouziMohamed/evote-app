"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.newToken = void 0;

var _jsonwebtoken = require("jsonwebtoken");

var _config = _interopRequireDefault(require("../../config/config"));

var newToken = function newToken(user) {
  var _Config$jwt = _config["default"].jwt,
      secret = _Config$jwt.secret,
      expiry = _Config$jwt.expiry;
  var token = (0, _jsonwebtoken.sign)({
    id: user._id
  }, secret, {
    expiresIn: expiry
  });
  return token;
};

exports.newToken = newToken;

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    (0, _jsonwebtoken.verify)(token, _config["default"].jwt.secret, function (err, payload) {
      if (err) return reject(err);
      return resolve(payload);
    });
  });
};

exports.verifyToken = verifyToken;