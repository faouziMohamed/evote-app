"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useActivationForm = useActivationForm;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _index = require("../utils/modals/index.dialog");

var _utils = require("../utils/utils");

var ActivationForm = /*#__PURE__*/function () {
  function ActivationForm() {
    var _this$dialogParent,
        _this$submitButton,
        _this = this;

    (0, _classCallCheck2["default"])(this, ActivationForm);
    this.form = document.querySelector('#activation-form');
    this.dialogParent = document.querySelector('.right-side');
    this.submitButton = document.querySelector('#btn-submit');
    this.spinner = (_this$dialogParent = this.dialogParent) === null || _this$dialogParent === void 0 ? void 0 : _this$dialogParent.querySelector('.spinner_preloader');
    this.spinner.classList.add('hidden');
    (_this$submitButton = this.submitButton) === null || _this$submitButton === void 0 ? void 0 : _this$submitButton.addEventListener('click', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", _this.attachEventToSubmitBtn(e));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }());
  }

  (0, _createClass2["default"])(ActivationForm, [{
    key: "attachEventToSubmitBtn",
    value: function () {
      var _attachEventToSubmitBtn = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(e) {
        var _yield$this$sendDataT, error, ok, rdr;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                e.preventDefault();
                this.spinner.classList.remove('hidden');
                _context2.next = 4;
                return this.sendDataToServer();

              case 4:
                _yield$this$sendDataT = _context2.sent;
                error = _yield$this$sendDataT.error;
                ok = _yield$this$sendDataT.ok;
                rdr = _yield$this$sendDataT.rdr;
                this.spinner.classList.add('hidden');

                if (!ok) {
                  (0, _index.showErrorDialog)({
                    modalTitle: 'Activation Error',
                    modalText: error,
                    parentEl: this.dialogParent,
                    btnEventCallback: rdr ? function () {
                      return (0, _utils.redirectTo)(rdr);
                    } : null
                  });
                } else {
                  (0, _index.showSuccessDialog)({
                    modalTitle: 'Activation Success',
                    modalText: "Your account has been activated successfully! ".concat(ok),
                    parentEl: this.dialogParent,
                    btnEventCallback: function btnEventCallback() {
                      return (0, _utils.redirectTo)('/');
                    }
                  });
                }

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function attachEventToSubmitBtn(_x2) {
        return _attachEventToSubmitBtn.apply(this, arguments);
      }

      return attachEventToSubmitBtn;
    }()
  }, {
    key: "sendDataToServer",
    value: function () {
      var _sendDataToServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var data, res, error, ok, rdr;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                data = this.readFormData();
                _context3.next = 3;
                return (0, _utils.postData)({
                  url: '/api/activate/request',
                  data: data
                });

              case 3:
                res = _context3.sent;
                error = res.error, ok = res.data, rdr = res.redirectTo;
                return _context3.abrupt("return", {
                  error: error,
                  ok: ok,
                  rdr: rdr
                });

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function sendDataToServer() {
        return _sendDataToServer.apply(this, arguments);
      }

      return sendDataToServer;
    }()
  }, {
    key: "readFormData",
    value: function readFormData() {
      var form = this.form;

      if (!form) {
        var msgError = 'An error occured, please contact a developer to resolve it!';
        return (0, _index.showErrorDialog)({
          modalTitle: 'Activation Error',
          modalText: msgError,
          parentEl: this.dialogParent
        });
      }

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = (0, _utils.removeExtraSpaces)(value);
      });
      return data;
    }
  }]);
  return ActivationForm;
}();

function useActivationForm() {
  return _useActivationForm.apply(this, arguments);
}

function _useActivationForm() {
  _useActivationForm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new ActivationForm());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _useActivationForm.apply(this, arguments);
}