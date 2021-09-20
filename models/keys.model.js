"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.decryptPassphrase = void 0;

var _mongoose = require("mongoose");

var _config = _interopRequireDefault(require("../config/config"));

var _aes = require("../utils/lib/aes.utils");

var keysSchema = new _mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true
  },
  publicArmoredKey: {
    type: String,
    required: true
  },
  privateArmoredKey: {
    type: String,
    required: true
  },
  passphrase: {
    type: String,
    "default": ''
  },
  knownEntities: [{
    email: String,
    publicKey: String
  }]
}, {
  timeStamp: true
});
keysSchema.index({
  email: 1,
  _id: 1
}, {
  unique: true
}); // Encrypt passphrase before saving to database

keysSchema.pre('save', function encryptPassPhrase(next) {
  if (this.isModified('passphrase')) {
    var encr = (0, _aes.encryptMessage)(this.passphrase, _config["default"].PASSPHRASE_KEY);
    this.passphrase = encr.toString();
  }

  next();
});

var decryptPassphrase = function decryptPassphrase(passphrase) {
  return (0, _aes.decryptMessage)(passphrase, _config["default"].PASSPHRASE_KEY);
};

exports.decryptPassphrase = decryptPassphrase;
var Keys = (0, _mongoose.model)('Keys', keysSchema);
var _default = Keys;
exports["default"] = _default;