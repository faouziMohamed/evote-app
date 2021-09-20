"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlertDialog = exports.argsFormat = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _classPrivateFieldGet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldGet"));

var _classPrivateFieldSet2 = _interopRequireDefault(require("@babel/runtime/helpers/classPrivateFieldSet"));

var _utils = require("../utils");

function _classPrivateMethodGet(receiver, privateSet, fn) { if (!privateSet.has(receiver)) { throw new TypeError("attempted to get private field on non-instance"); } return fn; }

var argsFormat = {
  modalType: 'error' || 'success' || 'warning' || 'info',
  modalTitle: '',
  modalText: '',
  modalOkBtnText: 'OK',
  modalCancelBtnText: 'Cancel',
  hasCancelBtn: false,
  dialogParent: null
};
exports.argsFormat = argsFormat;

var _btnBaseClass = /*#__PURE__*/new WeakMap();

var _dialogClass = /*#__PURE__*/new WeakMap();

var _btnOkClass = /*#__PURE__*/new WeakMap();

var _btnCancelClass = /*#__PURE__*/new WeakMap();

var _checkArgs = /*#__PURE__*/new WeakSet();

var AlertDialog = /*#__PURE__*/function () {
  function AlertDialog() {
    var modalArgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : argsFormat;
    (0, _classCallCheck2["default"])(this, AlertDialog);

    _checkArgs.add(this);

    _btnBaseClass.set(this, {
      writable: true,
      value: void 0
    });

    _dialogClass.set(this, {
      writable: true,
      value: void 0
    });

    _btnOkClass.set(this, {
      writable: true,
      value: void 0
    });

    _btnCancelClass.set(this, {
      writable: true,
      value: void 0
    });

    this.allTypes = ['error', 'success', 'warning', 'info'];

    if (!this.allTypes.includes(modalArgs.modalType)) {
      var msgError = "modalType must be one of '".concat(this.allTypes.join(', '), "'");
      throw new Error(msgError);
    }

    this.config = modalArgs;
    (0, _classPrivateFieldSet2["default"])(this, _btnBaseClass, 'alert-dialog-btn');
    (0, _classPrivateFieldSet2["default"])(this, _dialogClass, "alert-dialog");
    (0, _classPrivateFieldSet2["default"])(this, _btnOkClass, "".concat((0, _classPrivateFieldGet2["default"])(this, _btnBaseClass), " btn-").concat(this.config.modalType));
    (0, _classPrivateFieldSet2["default"])(this, _btnCancelClass, "".concat((0, _classPrivateFieldGet2["default"])(this, _btnBaseClass), " btn-cancel"));
    this.createDialog();

    if (!this.config.dialogParent) {
      this.config.dialogParent = (0, _utils.newElement)('div', {
        "class": 'alert-dialog-parent'
      });
    } else this.config.dialogParent.classList.add('alert-dialog-parent');

    this.config.dialogParent.append(this.dialog);
    this.elements = [this.dialog, this.btnOk, this.btnCancel];
    this.events = {
      dialog: [],
      btnOk: [],
      btnCancel: []
    };
  }

  (0, _createClass2["default"])(AlertDialog, [{
    key: "getDialog",
    value: function getDialog() {
      return this.dialog;
    }
  }, {
    key: "getDialogWithParent",
    value: function getDialogWithParent() {
      return this.config.dialogParent;
    }
  }, {
    key: "getButtonOk",
    value: function getButtonOk() {
      return this.btnOk;
    }
  }, {
    key: "getButtonCancel",
    value: function getButtonCancel() {
      return this.btnCancel;
    }
  }, {
    key: "attachEventsTo",
    value: function attachEventsTo() {
      var _this = this;

      var elementName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [''];
      var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [function () {}];

      var _classPrivateMethodGe = _classPrivateMethodGet(this, _checkArgs, _checkArgs2).call(this, elementName, events, callbacks),
          eventsArr = _classPrivateMethodGe.eventsArr,
          callbackArr = _classPrivateMethodGe.callbackArr; // keep in memory the events and callbacks


      eventsArr.forEach(function (event, index) {
        _this[elementName].addEventListener(event, callbackArr[index]);

        _this.events[elementName].push(event);
      });
      console.log("Events attached to ".concat(elementName));
    }
  }, {
    key: "removeEventsFrom",
    value: function removeEventsFrom() {
      var _this2 = this;

      var elementName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [''];
      var callbacks = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [function () {}];

      var _classPrivateMethodGe2 = _classPrivateMethodGet(this, _checkArgs, _checkArgs2).call(this, elementName, events, callbacks),
          eventsArr = _classPrivateMethodGe2.eventsArr,
          callbackArr = _classPrivateMethodGe2.callbackArr;

      if (this.events[elementName].length === 0) {
        // eslint-disable-next-line no-console
        console.log("No events attached to ".concat(elementName));
        return;
      } // reomve the events and callbacks in memory


      eventsArr.forEach(function (event, index) {
        _this2[elementName].removeEventListener(event, callbackArr[index]);

        _this2.events[elementName].splice(_this2.events[elementName].indexOf(event));
      }); // eslint-disable-next-line no-console

      console.log("Events removed from ".concat(elementName));
    }
  }, {
    key: "createDialog",
    value: function createDialog() {
      this.createTitle();
      this.createBody();
      this.createButtonContainer();
      this.dialog = (0, _utils.newElement)('div', {
        "class": (0, _classPrivateFieldGet2["default"])(this, _dialogClass)
      }, [this.title, this.body, this.btnContainer]);
      return this.dialog;
    }
  }, {
    key: "createTitle",
    value: function createTitle() {
      this.title = (0, _utils.newElement)('h2', {
        "class": "alert-dialog-title"
      }, [this.config.modalTitle]);
    }
  }, {
    key: "createBody",
    value: function createBody() {
      this.createBodyText();
      this.body = (0, _utils.newElement)('div', {
        "class": "alert-dialog-body"
      }, [this.text]);
    }
  }, {
    key: "createButtonContainer",
    value: function createButtonContainer() {
      this.createButtonOk();
      var btns = [this.btnOk];

      if (this.config.hasCancelBtn) {
        this.createButtonCancel();
        btns.push(this.btnCancel);
      }

      this.btnContainer = (0, _utils.newElement)('div', {
        "class": "alert-dialog-btn-container"
      }, btns);
    }
  }, {
    key: "createBodyText",
    value: function createBodyText() {
      this.text = (0, _utils.newElement)('p', {
        "class": "alert-dialog-text"
      }, [this.config.modalText]);
    }
  }, {
    key: "createButtonOk",
    value: function createButtonOk() {
      this.btnOk = (0, _utils.newElement)('button', {
        "class": (0, _classPrivateFieldGet2["default"])(this, _btnOkClass)
      }, [this.config.modalOkBtnText]);
    }
  }, {
    key: "createButtonCancel",
    value: function createButtonCancel() {
      this.btnCancel = (0, _utils.newElement)('button', {
        "class": (0, _classPrivateFieldGet2["default"])(this, _btnCancelClass)
      }, [this.config.modalCancelBtnText]);
    }
  }]);
  return AlertDialog;
}();
/*
<div class="dialog-parent">
  <div class='alert-dialog'>
    <h2 class='alert-dialog-title'>Confirm</h2>
    <div class='alert-dialog-body'>
      <p class='alert-dialog-text'>
        Please make sure all field correctly filled.
      </p>
    </div>
    <div class='alert-dialog-btns'>
      <button class="alert-dialog-btn btn-secondary alert-dialog-cancel">Cancel</button>
      <button class='alert-dialog-btn btn-error alert-dialog-ok'>OK</button>
    </div>
  </div>
</div>;
 */


exports.AlertDialog = AlertDialog;

function _checkArgs2(elementName, events, callbacks) {
  var msgError;

  if (!elementName) {
    msgError = "Expecting elementName to be one of " + "'".concat(this.elements.join(', '), "', but got '").concat(elementName, "'");
    throw new Error(msgError);
  }

  if (!events) {
    msgError = "Expecting event to be a string or an array of event, but got '".concat(events, "'");
    throw new Error(msgError);
  }

  if (!callbacks) {
    msgError = "Expecting callback to be a function or an array of function, but got '".concat(callbacks, "'");
    throw new Error(msgError);
  }

  var eventsArr = Array.isArray(events) ? events : [events];
  var callbackArr = Array.isArray(callbacks) ? callbacks : [callbacks];

  if (eventsArr.length !== callbackArr.length) {
    msgError = "Expecting events and callback to have the same length, but got ".concat(eventsArr.length, " and ").concat(callbackArr.length);
    throw new Error(msgError);
  }

  return {
    eventsArr: eventsArr,
    callbackArr: callbackArr
  };
}