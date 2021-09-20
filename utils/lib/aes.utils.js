"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateRandomString = exports.decryptMessage = exports.encryptMessage = exports.generateAESKey = void 0;

var _aes = require("crypto-js/aes");

var _encUtf = _interopRequireDefault(require("crypto-js/enc-utf8"));

var _nanoid = require("nanoid");

var generateAESKey = function generateAESKey() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return (0, _nanoid.nanoid)(size);
};

exports.generateAESKey = generateAESKey;

var encryptMessage = function encryptMessage(message, key) {
  return (0, _aes.encrypt)(message, key);
};

exports.encryptMessage = encryptMessage;

var decryptMessage = function decryptMessage(message, key) {
  return (0, _aes.decrypt)(message.toString(), key).toString(_encUtf["default"]);
};

exports.decryptMessage = decryptMessage;

var generateRandomString = function generateRandomString() {
  var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 100;
  return (0, _nanoid.nanoid)(size);
};

exports.generateRandomString = generateRandomString;