"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdminPrivileges = void 0;

var _userAdd = _interopRequireDefault(require("./user-add"));

var useAdminPrivileges = function useAdminPrivileges() {
  try {
    new _userAdd["default"]().render();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('AdminUiError : ', error.message);
  }
};

exports.useAdminPrivileges = useAdminPrivileges;