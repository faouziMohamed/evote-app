"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _authForm = require("../utils/auth-form.utils");

var _index = require("../utils/modals/index.dialog");

var _userData = require("../utils/user-data.utils");

var _utils = require("../utils/utils");

var _addUserModal = require("./add-user-modal");

var _userTable = _interopRequireDefault(require("./user-table"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var _succesCallBack = /*#__PURE__*/new WeakSet();

var UserAdd = /*#__PURE__*/function () {
  function UserAdd() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$userTableObj = _ref.userTableObj,
        userTableObj = _ref$userTableObj === void 0 ? new _userTable["default"]() : _ref$userTableObj;

    (0, _classCallCheck2["default"])(this, UserAdd);

    _succesCallBack.add(this);

    this.openModalBtn = document.querySelector('#openAddModal');
    this.modalContainer = document.querySelector('#admin-modal');
    this.contentRoot = document.querySelector('.main-content-root');
    this.userTable = userTableObj;
    this.modal = new _addUserModal.UserAddModal();
    this.closeBtn = this.modal.getCancelBtn();
    this.submitBtn = this.modal.getAddUserBtn();
  }

  (0, _createClass2["default"])(UserAdd, [{
    key: "render",
    value: function () {
      var _render = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.t0 = this.userTable;
                _context.next = 3;
                return (0, _userData.getUsersData)();

              case 3:
                _context.t1 = _context.sent;

                _context.t0.setData.call(_context.t0, _context.t1);

                this.userTable.render();
                this.useAddUserModal();

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function render() {
        return _render.apply(this, arguments);
      }

      return render;
    }()
  }, {
    key: "reRenderUserTable",
    value: function reRenderUserTable() {
      this.userTable.reRender();
    }
  }, {
    key: "useAddUserModal",
    value: function useAddUserModal() {
      var _this = this;

      if (!this.openModalBtn || !this.modalContainer || !this.contentRoot) return;
      this.openModalBtn.addEventListener('click', function () {
        return _this.handleOpenModalBtnClick();
      });
      this.closeBtn.addEventListener('click', function () {
        _this.modal.resetForm();

        _this.handleCloseBtnCLick();
      }); // submit button disabled by default

      this.submitBtn.disabled = true;
      this.submitBtn.addEventListener('click', function (e) {
        return _this.handleBtnSubmitAddNewUser(e);
      });
    }
  }, {
    key: "handleOpenModalBtnClick",
    value: // Open button handler
    function handleOpenModalBtnClick() {
      this.contentRoot.classList.add(['prevent-scroll'], ['blur']);
      this.modalContainer.classList.remove('hidden');
      this.modalContainer.append(this.modal.getDialog());
      (0, _authForm.useRegisterFormValidation)();
    } // CLose button handler

  }, {
    key: "handleCloseBtnCLick",
    value: function handleCloseBtnCLick() {
      this.modalContainer.classList.add('hidden');
      this.modalContainer.replaceChildren();
      this.contentRoot.classList.remove(['prevent-scroll'], ['blur']);
    } // Submit button handler

  }, {
    key: "handleBtnSubmitAddNewUser",
    value: function () {
      var _handleBtnSubmitAddNewUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(e) {
        var response, actionSuccessCallback, msgError;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();

                if (!(0, _authForm.checkInputsValidity)()) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 4;
                return UserAdd.sendDataToServer();

              case 4:
                response = _context2.sent;
                actionSuccessCallback = _classPrivateMethodGet(this, _succesCallBack, _succesCallBack2).call(this, response);
                UserAdd.useServerResponse(_objectSpread(_objectSpread({}, response), {}, {
                  actionSuccessCallback: actionSuccessCallback
                }));
                _context2.next = 11;
                break;

              case 9:
                msgError = 'Please fill correctly all the required fields!';
                (0, _index.showErrorDialog)({
                  modalText: msgError
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function handleBtnSubmitAddNewUser(_x) {
        return _handleBtnSubmitAddNewUser.apply(this, arguments);
      }

      return handleBtnSubmitAddNewUser;
    }()
  }], [{
    key: "getForm",
    value: function getForm() {
      UserAdd.form = document.querySelector('#add-new-user-form');
      return UserAdd.form;
    }
  }, {
    key: "sendDataToServer",
    value: function () {
      var _sendDataToServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var data, res, error, serverResponse, user;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = UserAdd.readFormData();
                _context3.next = 3;
                return (0, _utils.postData)({
                  url: '/api/admin/users/add',
                  data: data
                });

              case 3:
                res = _context3.sent;
                error = res.error, serverResponse = res.data, user = res.user;
                return _context3.abrupt("return", {
                  error: error,
                  serverResponse: serverResponse,
                  user: user
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function sendDataToServer() {
        return _sendDataToServer.apply(this, arguments);
      }

      return sendDataToServer;
    }()
  }, {
    key: "readFormData",
    value: function readFormData() {
      var form = UserAdd.getForm();

      if (!form) {
        var msgError = 'An error occured, please contact a developer to resolve it!';
        return (0, _index.showErrorDialog)({
          modalText: msgError
        });
      }

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = (0, _utils.strip)(value).trim();
      });
      var role = form.elements.role;
      var userType = form.elements.userType;
      data.role = role ? 'admin' : 'user';
      data.userType = userType.checked ? 'candidate' : 'voter';
      return data;
    }
  }, {
    key: "useServerResponse",
    value: function useServerResponse(_ref2) {
      var error = _ref2.error,
          serverResponse = _ref2.serverResponse,
          _ref2$actionSuccessCa = _ref2.actionSuccessCallback,
          actionSuccessCallback = _ref2$actionSuccessCa === void 0 ? function () {} : _ref2$actionSuccessCa,
          _ref2$actionErrorCall = _ref2.actionErrorCallback,
          actionErrorCallback = _ref2$actionErrorCall === void 0 ? function () {} : _ref2$actionErrorCall;

      if (error) {
        (0, _index.showErrorDialog)({
          modalText: error
        });
        actionErrorCallback();
      } else {
        (0, _index.showSuccessDialog)({
          modalText: serverResponse
        });
        actionSuccessCallback();
      }
    }
  }]);
  return UserAdd;
}();

exports["default"] = UserAdd;

function _succesCallBack2(response) {
  var _this2 = this;

  return function () {
    var _this2$closeBtn;

    (0, _userData.addOneUserToCache)(response === null || response === void 0 ? void 0 : response.user);

    _this2.reRenderUserTable();

    (_this2$closeBtn = _this2.closeBtn) === null || _this2$closeBtn === void 0 ? void 0 : _this2$closeBtn.click();
  };
}

(0, _defineProperty2["default"])(UserAdd, "form", null);