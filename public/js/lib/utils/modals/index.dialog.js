"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showDialog = showDialog;
exports.showSuccessDialog = showSuccessDialog;
exports.showErrorDialog = showErrorDialog;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _alerteDialog = require("./alerte-dialog");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function showDialog(_ref) {
  var _dialogParent$querySe;

  var _ref$modalType = _ref.modalType,
      modalType = _ref$modalType === void 0 ? 'success' : _ref$modalType,
      _ref$modalTitle = _ref.modalTitle,
      modalTitle = _ref$modalTitle === void 0 ? 'Success' : _ref$modalTitle,
      _ref$modalOkBtnText = _ref.modalOkBtnText,
      modalOkBtnText = _ref$modalOkBtnText === void 0 ? 'Done' : _ref$modalOkBtnText,
      _ref$modalText = _ref.modalText,
      modalText = _ref$modalText === void 0 ? 'Success' : _ref$modalText,
      _ref$parentEl = _ref.parentEl,
      parentEl = _ref$parentEl === void 0 ? document.body : _ref$parentEl,
      _ref$forceNewParent = _ref.forceNewParent,
      forceNewParent = _ref$forceNewParent === void 0 ? false : _ref$forceNewParent,
      _ref$btnEventCallback = _ref.btnEventCallback,
      btnEventCallback = _ref$btnEventCallback === void 0 ? null : _ref$btnEventCallback;
  var options = {
    modalType: modalType,
    modalTitle: modalTitle,
    modalOkBtnText: modalOkBtnText,
    modalText: modalText
  };
  var dialog = new _alerteDialog.AlertDialog(_objectSpread({}, options));
  var dialogParent = dialog.getDialogWithParent();
  dialog.attachEventsTo('btnOk', 'click', function () {
    dialogParent.remove(dialogParent);

    if (btnEventCallback) {
      btnEventCallback();
    }
  });
  var mainContent = document.querySelector('.main-content');

  if (forceNewParent) {
    parentEl.append(dialogParent);
  } else {
    var elParent = mainContent || parentEl;
    elParent.append(dialogParent);
  }

  (_dialogParent$querySe = dialogParent.querySelector('button')) === null || _dialogParent$querySe === void 0 ? void 0 : _dialogParent$querySe.focus();
}

function showSuccessDialog(_ref2) {
  var modalText = _ref2.modalText,
      _ref2$modalOkBtnText = _ref2.modalOkBtnText,
      modalOkBtnText = _ref2$modalOkBtnText === void 0 ? 'Close' : _ref2$modalOkBtnText,
      _ref2$modalTitle = _ref2.modalTitle,
      modalTitle = _ref2$modalTitle === void 0 ? 'User added' : _ref2$modalTitle,
      _ref2$parentEl = _ref2.parentEl,
      parentEl = _ref2$parentEl === void 0 ? document.body : _ref2$parentEl,
      _ref2$btnEventCallbac = _ref2.btnEventCallback,
      btnEventCallback = _ref2$btnEventCallbac === void 0 ? null : _ref2$btnEventCallbac;
  showDialog({
    modalType: 'success',
    modalOkBtnText: modalOkBtnText,
    modalTitle: modalTitle,
    modalText: modalText,
    parentEl: parentEl,
    btnEventCallback: btnEventCallback
  });
}

function showErrorDialog(_ref3) {
  var _ref3$modalTitle = _ref3.modalTitle,
      modalTitle = _ref3$modalTitle === void 0 ? 'Error' : _ref3$modalTitle,
      _ref3$modalOkBtnText = _ref3.modalOkBtnText,
      modalOkBtnText = _ref3$modalOkBtnText === void 0 ? 'Ok' : _ref3$modalOkBtnText,
      _ref3$modalText = _ref3.modalText,
      modalText = _ref3$modalText === void 0 ? 'An error occured, please retry!' : _ref3$modalText,
      _ref3$parentEl = _ref3.parentEl,
      parentEl = _ref3$parentEl === void 0 ? document.body : _ref3$parentEl,
      _ref3$btnEventCallbac = _ref3.btnEventCallback,
      btnEventCallback = _ref3$btnEventCallbac === void 0 ? null : _ref3$btnEventCallbac;
  showDialog({
    modalType: 'error',
    modalTitle: modalTitle,
    modalOkBtnText: modalOkBtnText,
    modalText: modalText,
    parentEl: parentEl,
    btnEventCallback: btnEventCallback
  });
}