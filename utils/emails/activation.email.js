"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _footer = _interopRequireDefault(require("./components/footer"));

var _head = _interopRequireDefault(require("./components/head"));

var _header = _interopRequireDefault(require("./components/header"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var userData = {
  _id: 1 || '1',
  name: {
    first: '',
    last: ''
  },
  username: '',
  email: ''
};

function getMsgBody(_ref) {
  var _ref$data = _ref.data,
      data = _ref$data === void 0 ? {
    token: '',
    btnContent: '',
    btnLink: ''
  } : _ref$data,
      _ref$user = _ref.user,
      user = _ref$user === void 0 ? userData : _ref$user;
  var activationLink = data.btnLink;
  var messageContent = "\n<div class=\"content-root\">\n  <p class=\"content-text\">\n    Hello ".concat(user.name.first, ", Please take a minute to complete your registration by\n    verifying your email address\n    <strong>").concat(user.email, "</strong>. Simply click the button below!\n  </p>\n</div>\n<a\n  href=\"").concat(activationLink, "\"\n  class=\"btn btn-primary btn-verify\">\n  <i class=\"fas fa-user-check\"></i>\n  <span class=\"header-text\">").concat(data.btnContent, "</span>\n</a>\n<div class=\"content-root alternative\">\n  <small class=\"content-text\">\n    If the button above does not work, please copy and paste the link\n    below into your browser.\n  </small>\n  <small class=\"link-container\">").concat(activationLink, "</small>\n</div>\n");
  return messageContent;
}

function getActivationMsg(_ref2) {
  var _ref2$data = _ref2.data,
      data = _ref2$data === void 0 ? {
    token: ''
  } : _ref2$data,
      _ref2$user = _ref2.user,
      user = _ref2$user === void 0 ? userData : _ref2$user;
  var btnLink = "".concat(process.env.BASE_URL, "/api/activate/?token=").concat(data.token);
  var btnContent = 'Verify account';
  var header = (0, _header["default"])({
    data: {
      btnLink: btnLink,
      btnContent: btnContent
    }
  });
  var messageContent = getMsgBody({
    data: _objectSpread({
      btnContent: btnContent,
      btnLink: btnLink
    }, data),
    user: user
  });
  var html = "\n  <!DOCTYPE html>\n<html lang=\"en\">\n  ".concat(_head["default"], "\n  <body>\n    <div class=\"root\">\n      ").concat(header, "\n        <main class=\"main-content\">").concat(messageContent, "</main>\n      ").concat(_footer["default"], "\n    </div>\n  </body>\n</html>");
  return html;
}

var _default = getActivationMsg;
exports["default"] = _default;