"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsersData = getUsersData;
exports.filterUsers = exports.useUsersTable = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userTableRow = require("./userTableRow");

var useUsersTable = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var tabBtns, tBody, checkAllIpunt, data, preloader, dataStringified;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tabBtns = document.querySelectorAll('.tab-btn');
            tBody = document.querySelector('.users-table-body');
            checkAllIpunt = document.querySelector('#checkbox-all');
            _context.next = 5;
            return getUsersData();

          case 5:
            data = _context.sent;

            if (!(!(tabBtns !== null && tabBtns !== void 0 && tabBtns.length) > 0 || !tBody && !data)) {
              _context.next = 8;
              break;
            }

            return _context.abrupt("return");

          case 8:
            if (checkAllIpunt) checkAllIpunt.checked = false;
            tabBtns.forEach(function (btn) {
              btn.addEventListener('click', function (e) {
                changeActiveButton(e);

                var _ref2 = e.target.dataset || 'all',
                    filter = _ref2.filter;

                useUserFilter(tBody, data, filter);
              });
            });
            preloader = document.querySelector('#tabwindow-preloader');
            checkAllIpunt.addEventListener('change', function (e) {
              var checkboxes = document.querySelectorAll('.user-row-checkbox');
              if (preloader) preloader.classList.remove('hidden');
              checkboxes.forEach(function (checkbox) {
                checkbox.checked = e.target.checked;
              });
              if (preloader) preloader.classList.add('hidden');
            });
            useUserFilter(tBody, data, 'all');
            if (preloader) preloader.classList.add('hidden');
            dataStringified = JSON.stringify(data);
            localStorage.setItem('users', dataStringified);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function useUsersTable() {
    return _ref.apply(this, arguments);
  };
}();

exports.useUsersTable = useUsersTable;

var filterUsers = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
    var _ref3$by, by, user, tBody, row, isAdmin, isNormalUser, isCandidate;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref3$by = _ref3.by, by = _ref3$by === void 0 ? 'all' : _ref3$by, user = _ref3.user, tBody = _ref3.tBody;

            if (['all', 'admin', 'user', 'candidate'].includes(by)) {
              _context2.next = 3;
              break;
            }

            throw new Error('Invalid filter');

          case 3:
            row = new _userTableRow.UserTableRow(user);
            row.attachEventTo('checkbox', 'click', useCheckBoxAll);

            isAdmin = function isAdmin(str) {
              return str === 'admin';
            };

            isNormalUser = function isNormalUser(str) {
              return str === 'user';
            };

            isCandidate = function isCandidate(str) {
              return str === 'candidate';
            };

            if (by === 'all') {
              tBody.append(row.getRow());
            } else if ([by, user.role].every(isAdmin)) {
              tBody.append(row.getRow());
            } else if ([by, user.role].every(isNormalUser)) {
              tBody.append(row.getRow());
            } else if ([by, user.userType].every(isCandidate)) {
              tBody.append(row.getRow());
            }

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function filterUsers(_x) {
    return _ref4.apply(this, arguments);
  };
}();

exports.filterUsers = filterUsers;

function useCheckBoxAll() {
  var checkboxes = document.querySelectorAll('.user-row-checkbox');
  var checkAll = document.querySelector('#checkbox-all');
  var checkVisual = document.querySelector('#checkbox-all--visual');
  var inputs = (0, _toConsumableArray2["default"])(checkboxes);
  var isChecked = inputs.every(function (input) {
    return input.checked;
  });
  var atLeastOneChecked = inputs.some(function (input) {
    return input.checked;
  });
  if (!checkAll || !checkVisual) return;

  if (isChecked) {
    checkAll.checked = true;
    checkVisual.classList.remove('partially-checked');
  } else if (atLeastOneChecked) {
    checkAll.checked = true;
    checkVisual.classList.add('partially-checked');
  } else {
    checkAll.checked = false;
    checkVisual.classList.remove('partially-checked');
  }
}

function getUsersData() {
  return _getUsersData.apply(this, arguments);
}

function _getUsersData() {
  _getUsersData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var users, _yield$users$json, data;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return fetch("/api/users/all?displayable=true");

          case 2:
            users = _context3.sent;
            _context3.next = 5;
            return users.json();

          case 5:
            _yield$users$json = _context3.sent;
            data = _yield$users$json.data;
            return _context3.abrupt("return", data);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getUsersData.apply(this, arguments);
}

function changeActiveButton(e) {
  var activeBtn = document.querySelector('.tab-active');
  if (e.target.classList.contains('tab-active') && !activeBtn) return;
  activeBtn.classList.remove('tab-active');
  e.target.classList.add('tab-active');
}

function useUserFilter(tBody, data, filter) {
  tBody.replaceChildren();
  data.forEach(function (user) {
    return filterUsers({
      user: user,
      tBody: tBody,
      by: filter
    });
  });
}