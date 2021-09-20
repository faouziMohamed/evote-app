"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersData = getUsersData;
exports.addOneUserToCache = exports.getUsersFromCache = exports.addUsersToCache = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var addUsersToCache = function addUsersToCache() {
  var usersData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
  var dataStringified = JSON.stringify(usersData);
  localStorage.setItem('users', dataStringified);
};

exports.addUsersToCache = addUsersToCache;

var getUsersFromCache = function getUsersFromCache() {
  var usersData = localStorage.getItem('users') || [{}];
  return JSON.parse(usersData);
};

exports.getUsersFromCache = getUsersFromCache;

var addOneUserToCache = function addOneUserToCache() {
  var user = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var usersData = getUsersFromCache() || [{}];
  usersData.push(user);
  addUsersToCache(usersData);
};

exports.addOneUserToCache = addOneUserToCache;

function getUsersData() {
  return _getUsersData.apply(this, arguments);
}

function _getUsersData() {
  _getUsersData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var users, _yield$users$json, data;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch("/api/users/all?displayable=true");

          case 2:
            users = _context.sent;
            _context.next = 5;
            return users.json();

          case 5:
            _yield$users$json = _context.sent;
            data = _yield$users$json.data;
            return _context.abrupt("return", data);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getUsersData.apply(this, arguments);
}