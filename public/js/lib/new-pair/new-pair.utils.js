"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hideLoadSpinner = hideLoadSpinner;
exports.displayMessage = displayMessage;
exports.displayError = displayError;
exports.ActionButton = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

function _classStaticPrivateFieldSpecSet(receiver, classConstructor, descriptor, value) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "set"); _classApplyDescriptorSet(receiver, descriptor, value); return value; }

function _classApplyDescriptorSet(receiver, descriptor, value) { if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } }

function _classStaticPrivateFieldSpecGet(receiver, classConstructor, descriptor) { _classCheckPrivateStaticAccess(receiver, classConstructor); _classCheckPrivateStaticFieldDescriptor(descriptor, "get"); return _classApplyDescriptorGet(receiver, descriptor); }

function _classCheckPrivateStaticFieldDescriptor(descriptor, action) { if (descriptor === undefined) { throw new TypeError("attempted to " + action + " private static field before its declaration"); } }

function _classCheckPrivateStaticAccess(receiver, classConstructor) { if (receiver !== classConstructor) { throw new TypeError("Private static access of wrong provenance"); } }

function _classApplyDescriptorGet(receiver, descriptor) { if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

var _showHideBtn = /*#__PURE__*/new WeakMap();

var ActionButton = function ActionButton() {
  var _this = this;

  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    action: function action() {},
    text: 'Continue',
    show: false
  };
  (0, _classCallCheck2["default"])(this, ActionButton);
  (0, _defineProperty2["default"])(this, "text", '');
  (0, _defineProperty2["default"])(this, "lastBtnAction", function () {
    displayError('Please make sure everything is done correctly.');
  });
  (0, _defineProperty2["default"])(this, "hideActionBtn", function () {
    return ActionButton.actionBtn.classList.add('hidden');
  });
  (0, _defineProperty2["default"])(this, "showActionBtn", function () {
    return ActionButton.actionBtn.classList.remove('hidden');
  });

  _showHideBtn.set(this, {
    writable: true,
    value: function value() {
      var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      if (show) _this.showActionBtn();else _this.hideActionBtn();
    }
  });

  (0, _defineProperty2["default"])(this, "setText", function (text) {
    ActionButton.actionBtn.innerText = text;
  });
  (0, _defineProperty2["default"])(this, "makeErrorBtn", function () {
    return ActionButton.actionBtn.classList.add('action-btn-error');
  });
  (0, _defineProperty2["default"])(this, "makeDefaultBtn", function () {
    return ActionButton.actionBtn.classList.remove('action-btn-error');
  });
  (0, _defineProperty2["default"])(this, "toggleBtnType", function () {
    var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (error) _this.makeErrorBtn();else _this.makeDefaultBtn();
  });
  (0, _defineProperty2["default"])(this, "setAction", function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    ActionButton.actionBtn.removeEventListener('click', _this.lastBtnAction);
    _this.lastBtnAction = callback;
    ActionButton.actionBtn.addEventListener('click', callback);
  });
  (0, _defineProperty2["default"])(this, "updateButton", function () {
    var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
    var text = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Continue';
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var show = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    (0, _classPrivateFieldGet2["default"])(_this, _showHideBtn).call(_this, show);

    _this.setText(text);

    _this.setAction(callback);

    _this.toggleBtnType(error);
  });

  if (!_classStaticPrivateFieldSpecGet(ActionButton, ActionButton, _instance)) {
    _classStaticPrivateFieldSpecSet(ActionButton, ActionButton, _instance, this);

    this.lastBtnAction = params.action;
    this.text = params.text;
  }

  this.updateButton(this.lastBtnAction, this.text, params.error, params.show);
  return _classStaticPrivateFieldSpecGet(ActionButton, ActionButton, _instance);
};

exports.ActionButton = ActionButton;
(0, _defineProperty2["default"])(ActionButton, "actionBtn", document.querySelector('.action-btn'));
var _instance = {
  writable: true,
  value: null
};

function hideLoadSpinner() {
  var loadSpinner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.querySelector('.loading__spinner');
  if (loadSpinner) loadSpinner.classList.add('hidden');
}

var rootElement = document.querySelector('.root');

function displayMessage(message) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
  var spinerTxt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.querySelector('.loading__text');

  if (spinerTxt) {
    handleErrorOutput(type, spinerTxt);
    spinerTxt.innerHTML = message;
    return;
  } // eslint-disable-next-line no-console


  console.log('Cannot display message');
}

function handleErrorOutput(type, spinerTxt) {
  if (type === 'error') {
    spinerTxt.classList.add('error-msg');
    rootElement.classList.add('root_error');
    rootElement.classList.remove('root_warning');
  } else if (type === 'warning') {
    spinerTxt.classList.add('warning-msg');
    rootElement.classList.remove('root_error');
    rootElement.classList.add('root_warning');
  } else {
    rootElement.classList.remove('root_error');
    rootElement.classList.remove('root_warning');
  }
}

function displayError(error) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
  displayMessage("".concat(type === 'error' ? 'error' : 'warning', ": ").concat(error), type);
  hideLoadSpinner();
}