"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRegisterFormValidation = useRegisterFormValidation;
exports.getInputAndErorrElement = getInputAndErorrElement;
exports.handleInputValueError = handleInputValueError;
exports.handleInputWithRegexValueError = handleInputWithRegexValueError;
exports.checkInputsValidity = checkInputsValidity;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _utils = require("./utils");

// import { isEmpty } from 'lodash';
function useRegisterFormValidation() {
  var btnSubmit = document.querySelector('#btn-submit');
  if (btnSubmit) btnSubmit.disabled = true; // Some time fields are automatically filled by the browser, check if everything is Ok

  activateSubmitButton('btn-submit');

  var _getInputAndErorrElem = getInputAndErorrElement('firstname'),
      _getInputAndErorrElem2 = (0, _slicedToArray2["default"])(_getInputAndErorrElem, 2),
      firstName = _getInputAndErorrElem2[0],
      firstNameFeedbackEL = _getInputAndErorrElem2[1];

  var _getInputAndErorrElem3 = getInputAndErorrElement('lastname'),
      _getInputAndErorrElem4 = (0, _slicedToArray2["default"])(_getInputAndErorrElem3, 2),
      lastName = _getInputAndErorrElem4[0],
      lastNameFeedbackEL = _getInputAndErorrElem4[1];

  var _getInputAndErorrElem5 = getInputAndErorrElement('email'),
      _getInputAndErorrElem6 = (0, _slicedToArray2["default"])(_getInputAndErorrElem5, 2),
      email = _getInputAndErorrElem6[0],
      emailFeedbackEL = _getInputAndErorrElem6[1];

  var _getInputAndErorrElem7 = getInputAndErorrElement('username'),
      _getInputAndErorrElem8 = (0, _slicedToArray2["default"])(_getInputAndErorrElem7, 2),
      username = _getInputAndErorrElem8[0],
      usernameFeedbackEL = _getInputAndErorrElem8[1];

  var _getInputAndErorrElem9 = getInputAndErorrElement('password'),
      _getInputAndErorrElem10 = (0, _slicedToArray2["default"])(_getInputAndErorrElem9, 2),
      password = _getInputAndErorrElem10[0],
      passwordFeedbackEL = _getInputAndErorrElem10[1];

  var emailRegex = (0, _utils.getEmailRegex)();
  var usernameRegex = (0, _utils.getUsernameRegex)();
  var passwordRegex = (0, _utils.getPasswordRegex)();
  var uniqueElNames = [String(email === null || email === void 0 ? void 0 : email.name), String(username === null || username === void 0 ? void 0 : username.name)];
  handleInputValueError(firstName, firstNameFeedbackEL);
  handleInputValueError(lastName, lastNameFeedbackEL);
  handleInputWithRegexValueError({
    input: username,
    errorElement: usernameFeedbackEL,
    regex: usernameRegex,
    uniqueElements: uniqueElNames
  });
  handleInputWithRegexValueError({
    input: email,
    errorElement: emailFeedbackEL,
    regex: emailRegex,
    uniqueElements: uniqueElNames
  });
  if (password && passwordFeedbackEL) handleInputWithRegexValueError({
    input: password,
    errorElement: passwordFeedbackEL,
    regex: passwordRegex
  });
} // Form validation handlers


function getInputAndErorrElement(id) {
  var input = document.querySelector("#".concat(id));
  var inputFeedbackEL = document.querySelector("#".concat(id, " ~ .invalid-feedback"));
  return [input, inputFeedbackEL];
}

function handleInputValueError(input, errorElement) {
  var _input$dataset;

  var inputName = ((_input$dataset = input.dataset) === null || _input$dataset === void 0 ? void 0 : _input$dataset.name) || '';

  var verify = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var message;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(0, _utils.isEmpty)(input.value)) {
                _context.next = 5;
                break;
              }

              message = "".concat(inputName, " is invalid and is required");
              handleInvalidInput(input, errorElement, message);
              _context.next = 7;
              break;

            case 5:
              _context.next = 7;
              return handleValidInput(input, errorElement);

            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function verify() {
      return _ref.apply(this, arguments);
    };
  }();

  ['input', 'blur'].forEach(function (event) {
    return input.addEventListener(event, verify);
  });
}

function handleInputWithRegexValueError(_ref2) {
  var input = _ref2.input,
      errorElement = _ref2.errorElement,
      regex = _ref2.regex,
      _ref2$uniqueElements = _ref2.uniqueElements,
      uniqueElements = _ref2$uniqueElements === void 0 ? ['username'] : _ref2$uniqueElements;
  var watchList = [];
  if (uniqueElements) watchList = (0, _utils.isString)(uniqueElements) ? [uniqueElements] : uniqueElements;
  var params = {
    input: input,
    errorElement: errorElement,
    regex: regex,
    watchList: watchList
  };
  [attachInputEvent, attachBlurEvent].forEach(function (fn) {
    return fn(params);
  });
}

function attachInputEvent(_ref3) {
  var _input$dataset2;

  var input = _ref3.input,
      errorElement = _ref3.errorElement,
      regex = _ref3.regex,
      watchList = _ref3.watchList;
  var inputName = ((_input$dataset2 = input.dataset) === null || _input$dataset2 === void 0 ? void 0 : _input$dataset2.name) || '';
  input.addEventListener('input', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var value, message, _message, checkExists;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            value = (0, _utils.removeExtraSpaces)(input.value);

            if (!(0, _utils.isEmpty)(value)) {
              _context2.next = 6;
              break;
            }

            message = "".concat(inputName, " is invalid and is required");
            handleInvalidInput(input, errorElement, message);
            _context2.next = 15;
            break;

          case 6:
            if (regex.test(value)) {
              _context2.next = 12;
              break;
            }

            _message = "Invalid ".concat(inputName);

            if ((inputName === null || inputName === void 0 ? void 0 : inputName.toLocaleLowerCase()) === 'password') {
              _message = validatePassword(value, _message);
            } else _message = "Invalid ".concat(inputName);

            handleInvalidInput(input, errorElement, _message);
            _context2.next = 15;
            break;

          case 12:
            checkExists = watchList.includes(input.name);
            _context2.next = 15;
            return handleValidInput(input, errorElement, checkExists);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
}

function validatePassword(value) {
  var msg = (0, _utils.newElement)('p', {}, ['The password must contain : ']);
  var lis = [];
  var specialChars = ['@', '#', '%', '^', '$', '!', '%', '*', '?', '&'];
  if (value.length < 7) lis.push((0, _utils.newElement)('li', {}, ["at last 7 characters"]));
  if (value.search(/[a-z]/) < 0) lis.push((0, _utils.newElement)('li', {}, ["at least 1 lowercase letter"]));
  if (value.search(/[A-Z]/) < 0) lis.push((0, _utils.newElement)('li', {}, ["at least 1 uppercase letter"]));
  if (value.search(/[0-9]/) < 0) lis.push((0, _utils.newElement)('li', {}, ["at least 1 number"]));

  if (value.search(RegExp("[".concat(specialChars.join(''), "]"))) < 0) {
    lis.push((0, _utils.newElement)('li', {}, ["at least 1 special character in : ".concat(specialChars.join(' '))]));
  }

  var ul = (0, _utils.newElement)('ul', {
    "class": 'list-msg'
  }, lis);
  return (0, _utils.newElement)('div', {}, [msg, ul]);
}

function attachBlurEvent(_ref5) {
  var _input$dataset3;

  var input = _ref5.input,
      errorElement = _ref5.errorElement,
      regex = _ref5.regex,
      watchList = _ref5.watchList;
  var inputName = ((_input$dataset3 = input.dataset) === null || _input$dataset3 === void 0 ? void 0 : _input$dataset3.name) || '';
  input.addEventListener('blur', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
    var value, message, checkExists;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            value = (0, _utils.removeExtraSpaces)(input.value);

            if (!((0, _utils.isEmpty)(value) || !regex.test(value))) {
              _context3.next = 7;
              break;
            }

            message = "".concat(inputName, " is invalid and is required");

            if ((inputName === null || inputName === void 0 ? void 0 : inputName.toLocaleLowerCase()) === 'password') {
              message = validatePassword(value, message);
            } else message = "Invalid ".concat(inputName);

            handleInvalidInput(input, errorElement, message);
            _context3.next = 10;
            break;

          case 7:
            checkExists = watchList.includes(input.name);
            _context3.next = 10;
            return handleValidInput(input, errorElement, checkExists);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
}

function checkInputsValidity() {
  var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'form-control:not(.optional)';
  var inputs = document.querySelectorAll(".".concat(className));

  var isCorrect = function isCorrect(input) {
    return input.classList.contains('is-valid') || !input.classList.contains('is-invalid');
  };

  var isValid = function isValid(input) {
    return !(0, _utils.isEmpty)(input.value) && isCorrect(input);
  };

  return (0, _toConsumableArray2["default"])(inputs).every(isValid);
}

function handleInvalidInput(input, errorElement, message) {
  var submitBtnId = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'btn-submit';
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');

  if (message) {
    errorElement === null || errorElement === void 0 ? void 0 : errorElement.replaceChildren(message);
    input.setCustomValidity(message);
  }

  var submitButton = document.querySelector("#".concat(submitBtnId));
  if (submitButton) submitButton.disabled = true;
}

function handleValidInput(_x, _x2) {
  return _handleValidInput.apply(this, arguments);
}

function _handleValidInput() {
  _handleValidInput = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(input, errorElement) {
    var check,
        message,
        _args4 = arguments;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            check = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : false;
            _context4.prev = 1;
            _context4.t0 = check;

            if (!_context4.t0) {
              _context4.next = 7;
              break;
            }

            _context4.next = 6;
            return verifyValueIfUsed(input);

          case 6:
            _context4.t0 = _context4.sent;

          case 7:
            if (!_context4.t0) {
              _context4.next = 11;
              break;
            }

            message = "".concat(input.value, " is already taken");
            handleInvalidInput(input, errorElement, message);
            return _context4.abrupt("return");

          case 11:
            removeErrorMessages(input, errorElement);
            activateSubmitButton();
            _context4.next = 18;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t1 = _context4["catch"](1);
            // eslint-disable-next-line no-console
            console.log(_context4.t1);

          case 18:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 15]]);
  }));
  return _handleValidInput.apply(this, arguments);
}

function verifyValueIfUsed(_x3) {
  return _verifyValueIfUsed.apply(this, arguments);
}

function _verifyValueIfUsed() {
  _verifyValueIfUsed = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(input) {
    var value, url, _yield$getData, exist;

    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            value = (0, _utils.removeExtraSpaces)(input.value);
            url = "/api/users/verify/".concat(input.name, "/").concat(value);
            _context5.next = 4;
            return (0, _utils.getData)({
              url: url
            });

          case 4:
            _yield$getData = _context5.sent;
            exist = _yield$getData.data;
            return _context5.abrupt("return", !!exist);

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _verifyValueIfUsed.apply(this, arguments);
}

function removeErrorMessages(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  if (errorElement) errorElement.textContent = '✔';
  input.setCustomValidity('');
}

function activateSubmitButton() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'btn-submit';
  var areInputsValid = checkInputsValidity();

  if (areInputsValid) {
    var submitButton = document.querySelector("#".concat(id));
    if (submitButton) submitButton.disabled = false;
  }
}