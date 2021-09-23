"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullName = getFullName;
exports.postData = postData;
exports.getData = getData;
exports.newElement = newElement;
exports.isValidPassword = exports.isValidName = exports.isValidUsername = exports.isValidEmail = exports.isNotEmpty = exports.isEmpty = exports.isArrayOfStrings = exports.isAnArray = exports.isString = exports.removeExtraSpaces = exports.stripAll = exports.strip = exports.getPasswordRegex = exports.getCINRegex = exports.getNameRegex = exports.getUsernameRegex = exports.getEmailRegex = exports.capitalizeAll = exports.capitalize = exports.reloadPage = exports.redirectTo = exports.decodeCookie = exports.getDataFromCookie = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function getFullName() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    first: '',
    last: ''
  };
  return "".concat(name.first, " ").concat(name.last);
}

var getDataFromCookie = function getDataFromCookie(cookieName) {
  return document.cookie.split('; ').find(function (token) {
    return token.startsWith(cookieName);
  }).split('=')[1];
};

exports.getDataFromCookie = getDataFromCookie;

var decodeCookie = function decodeCookie(cookieName) {
  return decodeURIComponent(cookieName);
};

exports.decodeCookie = decodeCookie;

var redirectTo = function redirectTo(path) {
  window.location.href = path;
};

exports.redirectTo = redirectTo;

var reloadPage = function reloadPage() {
  return window.location.reload();
};

exports.reloadPage = reloadPage;

function postData(_x) {
  return _postData.apply(this, arguments);
}

function _postData() {
  _postData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref) {
    var _ref$url, url, _ref$data, data, _ref$stringify, stringify, response;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref$url = _ref.url, url = _ref$url === void 0 ? '' : _ref$url, _ref$data = _ref.data, data = _ref$data === void 0 ? {} : _ref$data, _ref$stringify = _ref.stringify, stringify = _ref$stringify === void 0 ? true : _ref$stringify;
            _context.next = 3;
            return fetch(url, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: stringify ? JSON.stringify(data) : data
            });

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response.json());

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _postData.apply(this, arguments);
}

function getData(_x2) {
  return _getData.apply(this, arguments);
}

function _getData() {
  _getData = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref2) {
    var _ref2$url, url, response;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2$url = _ref2.url, url = _ref2$url === void 0 ? '' : _ref2$url;
            _context2.next = 3;
            return fetch(url);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response.json());

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getData.apply(this, arguments);
}

function newElement(name) {
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var childs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var node = document.createElement(name);
  var keys = Object.getOwnPropertyNames(attributes);
  keys.forEach(function (key) {
    node.setAttribute("".concat(key), attributes["".concat(key)]);
  });
  node.append.apply(node, (0, _toConsumableArray2["default"])(childs));
  return node;
}

var capitalize = function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

exports.capitalize = capitalize;

var capitalizeAll = function capitalizeAll(str) {
  return str.replace(/\w\S*/g, capitalize);
};

exports.capitalizeAll = capitalizeAll;

var getEmailRegex = function getEmailRegex() {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
};

exports.getEmailRegex = getEmailRegex;

var getUsernameRegex = function getUsernameRegex() {
  return /^[a-zA-Z][a-zA-Z0-9_]{4,}$/;
};

exports.getUsernameRegex = getUsernameRegex;

var getNameRegex = function getNameRegex() {
  return /^[a-zA-Z](\.?\s?\w+)+$/;
};

exports.getNameRegex = getNameRegex;

var getCINRegex = function getCINRegex() {
  return /^[0-9]{5,}$/;
};

exports.getCINRegex = getCINRegex;

var getPasswordRegex = function getPasswordRegex() {
  return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#%^$!%*?&])[\w\W@#%^$!%*?&]{7,}/;
};

exports.getPasswordRegex = getPasswordRegex;

var strip = function strip(str) {
  return String(str).replace(/\s+/g, ' ');
};

exports.strip = strip;

var stripAll = function stripAll(str) {
  return String(str).replace(/\s+/g, '');
};

exports.stripAll = stripAll;

var removeExtraSpaces = function removeExtraSpaces(str) {
  return strip(str).trim();
};

exports.removeExtraSpaces = removeExtraSpaces;

var isString = function isString(str) {
  return typeof str === 'string';
};

exports.isString = isString;

var isAnArray = function isAnArray(arr) {
  return Array.isArray(arr);
};

exports.isAnArray = isAnArray;

var isArrayOfStrings = function isArrayOfStrings(arr) {
  return isAnArray(arr) && arr.every(function (item) {
    return isString(item);
  });
};

exports.isArrayOfStrings = isArrayOfStrings;

var isEmpty = function isEmpty(str) {
  return !str || !strip(str).trim();
};

exports.isEmpty = isEmpty;

var isNotEmpty = function isNotEmpty(str) {
  return !isEmpty(str);
};

exports.isNotEmpty = isNotEmpty;

var isValidEmail = function isValidEmail(str) {
  return getEmailRegex().test(removeExtraSpaces(str));
};

exports.isValidEmail = isValidEmail;

var isValidUsername = function isValidUsername(str) {
  return getUsernameRegex().test(removeExtraSpaces(str));
};

exports.isValidUsername = isValidUsername;

var isValidName = function isValidName(str) {
  return getNameRegex().test(removeExtraSpaces(str));
};

exports.isValidName = isValidName;

var isValidPassword = function isValidPassword(str) {
  return getPasswordRegex().test(removeExtraSpaces(str));
};

exports.isValidPassword = isValidPassword;