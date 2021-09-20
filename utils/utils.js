"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserProfilePicture = getUserProfilePicture;
exports.isBrowser = void 0;

var _fs = require("fs");

var _path = _interopRequireDefault(require("path"));

var _config = _interopRequireDefault(require("../config/config"));

var isBrowser = function isBrowser() {
  return typeof window !== 'undefined' && typeof window.document !== 'undefined';
};

exports.isBrowser = isBrowser;

function getUserProfilePicture(id) {
  var profilePicture = _config["default"].USER_IMG_URL;

  var imgPath = _path["default"].resolve(_config["default"].IMG_DIR_PATH, "".concat(id));

  if ((0, _fs.existsSync)(imgPath)) {
    profilePicture = "".concat(_config["default"].IMG_DIR_URL, "/").concat(id);
  }

  return profilePicture;
}