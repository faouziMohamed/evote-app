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
    var _this = this;

    (0, _classCallCheck2["default"])(this, ActivationForm);
    this.form = document.querySelector('#activation-form');
    this.formParent = this.form.parentElement;
    this.submitButton = document.querySelector('#btn-submit');
    this.submitButton.addEventListener('click', /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(e) {
        var _yield$_this$sendData, error, ok;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                e.preventDefault();
                _context.next = 3;
                return _this.sendDataToServer();

              case 3:
                _yield$_this$sendData = _context.sent;
                error = _yield$_this$sendData.error;
                ok = _yield$_this$sendData.ok;

                if (!ok) {
                  (0, _index.showErrorDialog)({
                    modalTitle: 'Activation Error',
                    modalText: error,
                    parentEl: _this.formParent
                  });
                } else {
                  (0, _index.showSuccessDialog)({
                    modalTitle: 'Activation Success',
                    modalText: "Your account has been activated successfully! ".concat(ok),
                    parentEl: _this.formParent
                  });
                }

              case 7:
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
    key: "sendDataToServer",
    value: function () {
      var _sendDataToServer = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var data, res, error, ok;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = this.readFormData();
                _context2.next = 3;
                return (0, _utils.postData)({
                  url: '/api/activate/request',
                  data: data
                });

              case 3:
                res = _context2.sent;
                error = res.error, ok = res.data;
                return _context2.abrupt("return", {
                  error: error,
                  ok: ok
                });

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
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
          parentEl: this.formParent
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
  _useActivationForm = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", new ActivationForm());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _useActivationForm.apply(this, arguments);
}