"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddUserModal = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _authForm = require("../utils/auth-form.utils");

var _index = require("../utils/modals/index.dialog");

var _utils = require("../utils/utils");

var _userAddModal = require("./userAddModal");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var useAddUserModal = function useAddUserModal() {
  var openModalBtn = document.querySelector('#openAddModal');
  var modalContainer = document.querySelector('#admin-modal');
  var contentRoot = document.querySelector('.main-content-root');
  if (!openModalBtn || !modalContainer || !contentRoot) return;
  var modal = new _userAddModal.UserAddModal();
  var _ref = [modal.getCancelBtn(), modal.getAddUserBtn()],
      closeBtn = _ref[0],
      submitBtn = _ref[1];
  openModalBtn.addEventListener('click', function () {
    return handleOpenModalBtnClick(contentRoot, modalContainer, modal);
  });
  closeBtn.addEventListener('click', function () {
    modal.resetForm();
    handleCloseBtnCLick(modalContainer, contentRoot);
  }); // submit button disabled by default

  submitBtn.disabled = true;
  submitBtn.addEventListener('click', function (e) {
    return handleBtnSubmitAddNewUser(e, closeBtn);
  });
}; // CLose button handler


exports.useAddUserModal = useAddUserModal;

function handleCloseBtnCLick(modalContainer, contentRoot) {
  modalContainer.classList.add('hidden');
  modalContainer.replaceChildren();
  contentRoot.classList.remove(['prevent-scroll'], ['blur']);
} // Open button handler


function handleOpenModalBtnClick(contentRoot, modalContainer, modal) {
  contentRoot.classList.add(['prevent-scroll'], ['blur']);
  modalContainer.classList.remove('hidden');
  modalContainer.append(modal.getDialog());
  (0, _authForm.useRegisterFormValidation)();
} // Submit button handler


function handleBtnSubmitAddNewUser(_x, _x2) {
  return _handleBtnSubmitAddNewUser.apply(this, arguments);
}

function _handleBtnSubmitAddNewUser() {
  _handleBtnSubmitAddNewUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e, closeBtn) {
    var response, actionSuccessCallback, msgError;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            e.preventDefault();

            if (!(0, _authForm.checkInputsValidity)()) {
              _context.next = 9;
              break;
            }

            _context.next = 4;
            return sendDataToServer();

          case 4:
            response = _context.sent;

            actionSuccessCallback = function actionSuccessCallback() {
              return closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.click();
            };

            useServerResponse(_objectSpread(_objectSpread({}, response), {}, {
              actionSuccessCallback: actionSuccessCallback
            }));
            _context.next = 11;
            break;

          case 9:
            msgError = 'Please fill correctly all the required fields!';
            (0, _index.showErrorDialog)({
              modalText: msgError
            });

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _handleBtnSubmitAddNewUser.apply(this, arguments);
}

function useServerResponse(_ref2) {
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

function sendDataToServer() {
  return _sendDataToServer.apply(this, arguments);
}

function _sendDataToServer() {
  _sendDataToServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var data, _yield$postData, error, serverResponse;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            data = readFormData();
            _context2.next = 3;
            return (0, _utils.postData)({
              url: '/api/admin/users/add',
              data: data
            });

          case 3:
            _yield$postData = _context2.sent;
            error = _yield$postData.error;
            serverResponse = _yield$postData.data;
            return _context2.abrupt("return", {
              error: error,
              serverResponse: serverResponse
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _sendDataToServer.apply(this, arguments);
}

function readFormData() {
  var form = document.querySelector('#add-new-user-form');

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
  data.role = form.elements.role.checked ? 'admin' : 'user';
  data.userType = form.elements.userType.checked ? 'candidate' : 'voter';
  return data;
}