"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.getEntity = void 0;

var _config = _interopRequireDefault(require("./config"));

var entities = {
  server: {
    name: _config["default"].SERVER_NAME,
    email: _config["default"].SERVER_EMAIL,
    passphrase: _config["default"].SERVER_PASSHPRASE,
    userID: function userID() {
      return [{
        name: this.name,
        email: this.email
      }];
    }
  },
  countCenter: {
    name: _config["default"].COCENTER_NAME,
    email: _config["default"].COCENTER_EMAIL,
    passphrase: _config["default"].COCENTER_PASSHPRASE,
    userID: function userID() {
      return [{
        name: this.name,
        email: this.email
      }];
    }
  },
  validationCenter: {
    name: _config["default"].VALCENTER_NAME,
    email: _config["default"].VALCENTER_EMAIL,
    passphrase: _config["default"].VALCENTER_PASSHPRASE,
    userID: function userID() {
      return [{
        name: this.name,
        email: this.email
      }];
    }
  }
};

var getEntity = function getEntity() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'server';
  return entities[name] || 'Error';
};

exports.getEntity = getEntity;
var _default = entities;
exports["default"] = _default;