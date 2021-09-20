"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAdminPrivileges = void 0;

var _userAdd = require("./userAdd");

var _usersList = require("./usersList");

var useAdminPrivileges = function useAdminPrivileges() {
  (0, _usersList.useUsersTable)();
  (0, _userAdd.useAddUserModal)();
};

exports.useAdminPrivileges = useAdminPrivileges;