"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loadSSpinners = require("../utils/preloader/loadS-spinners");

var _userData = require("../utils/user-data.utils");

var _userTableRow = require("./user-table-row");

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _getActiveTabButton = /*#__PURE__*/new WeakSet();

var UserTable = /*#__PURE__*/function () {
  function UserTable() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        data = _ref.data;

    (0, _classCallCheck2["default"])(this, UserTable);

    _getActiveTabButton.add(this);

    this.tabBtns = (0, _toConsumableArray2["default"])(document.querySelectorAll('.tab-btn')) || [];
    this.tBody = document.querySelector('.users-table-body');
    this.checkAllIpunts = document.querySelector('#checkbox-all');
    this.data = data;
    this.expectedUsersFilters = ['all', 'admin', 'user', 'candidate'];
    this.spinner = (0, _loadSSpinners.LoadSpinner)();
  }

  (0, _createClass2["default"])(UserTable, [{
    key: "render",
    value: function render() {
      this.spinner.show();
      this.useUserTable();
      (0, _userData.addUsersToCache)(this.data);
      this.spinner.hide();
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.data = data;
    }
  }, {
    key: "reRender",
    value: function () {
      var _reRender = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.data = (0, _userData.getUsersFromCache)();
                this.render();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function reRender() {
        return _reRender.apply(this, arguments);
      }

      return reRender;
    }()
  }, {
    key: "getData",
    value: function getData() {
      return this.data;
    }
  }, {
    key: "useUserTable",
    value: function useUserTable() {
      if (!this.tabBtns.length || !this.tBody && !this.data) return;
      this.attachEventsToTabsButton();
      this.attachEventToCheckAllInputs();
      this.useUserFilter('all');
    }
  }, {
    key: "attachEventToCheckAllInputs",
    value: function attachEventToCheckAllInputs() {
      var _this = this;

      this.checkAllIpunts.addEventListener('change', function (e) {
        var setChecked = function setChecked(checkbox) {
          checkbox.checked = e.target.checked;
        };

        _this.spinner.show();

        var checkboxes = document.querySelectorAll('.user-row-checkbox');
        checkboxes.forEach(setChecked);

        _this.spinner.hide();
      });
    }
  }, {
    key: "attachEventsToTabsButton",
    value: function attachEventsToTabsButton() {
      var _this2 = this;

      this.setActiveButton = function (el) {
        return el.classList.add('tab-active');
      };

      this.unsetActiveButton = function (el) {
        return el.classList.remove('tab-active');
      };

      this.tabBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          _this2.switchToActiveButton(e);

          var _ref2 = e.target.dataset || 'all',
              filter = _ref2.filter;

          _this2.useUserFilter(filter);
        });
      });
    }
  }, {
    key: "switchToActiveButton",
    value: function switchToActiveButton(e) {
      var activeBtn = _classPrivateMethodGet(this, _getActiveTabButton, _getActiveTabButton2).call(this);

      if (activeBtn !== e.target) {
        this.unsetActiveButton(activeBtn);
        this.setActiveButton(e.target);
        this.checkAllIpunts.checked = false;
      }
    }
  }, {
    key: "useUserFilter",
    value: function useUserFilter(filter) {
      var _this3 = this;

      this.tBody.replaceChildren();
      this.data.forEach(function (user) {
        return _this3.filterUsers({
          user: user,
          by: filter
        });
      });
    }
  }, {
    key: "filterUsers",
    value: function () {
      var _filterUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref3) {
        var _this4 = this;

        var _ref3$by, by, user, isNotValidFilter, row, isAdmin, isNormalUser, isCandidate;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref3$by = _ref3.by, by = _ref3$by === void 0 ? 'all' : _ref3$by, user = _ref3.user;
                isNotValidFilter = !this.expectedUsersFilters.includes(by);

                if (!isNotValidFilter) {
                  _context2.next = 4;
                  break;
                }

                throw new Error('Invalid filter');

              case 4:
                row = new _userTableRow.UserTableRow(user);
                row.attachEventTo('checkbox', 'click', function () {
                  return _this4.useCheckBoxAll();
                });

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
                  this.tBody.append(row.getRow());
                } else if ([by, user.role].every(isAdmin)) {
                  this.tBody.append(row.getRow());
                } else if ([by, user.role].every(isNormalUser)) {
                  this.tBody.append(row.getRow());
                } else if ([by, user.userType].every(isCandidate)) {
                  this.tBody.append(row.getRow());
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function filterUsers(_x) {
        return _filterUsers.apply(this, arguments);
      }

      return filterUsers;
    }()
  }, {
    key: "useCheckBoxAll",
    value: function useCheckBoxAll() {
      var checkboxes = document.querySelectorAll('.user-row-checkbox');
      var checkVisual = document.querySelector('#checkbox-all--visual');
      var inputs = (0, _toConsumableArray2["default"])(checkboxes);
      var areAllChecked = inputs.every(function (input) {
        return input.checked;
      });
      var atLeastOneChecked = inputs.some(function (input) {
        return input.checked;
      });
      if (!checkVisual) return;

      if (areAllChecked) {
        this.checkAllIpunts.checked = true;
        checkVisual.classList.remove('partially-checked');
      } else if (atLeastOneChecked) {
        this.checkAllIpunts.checked = true;
        checkVisual.classList.add('partially-checked');
      } else {
        this.checkAllIpunts.checked = false;
        checkVisual.classList.remove('partially-checked');
      }
    }
  }]);
  return UserTable;
}();

exports["default"] = UserTable;

function _getActiveTabButton2() {
  return this.tabBtns.find(function (btn) {
    return btn.classList.contains('tab-active');
  });
}