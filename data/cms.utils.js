"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addScriptTag = addScriptTag;
exports.setCurrentPage = setCurrentPage;
exports.getCommonPageData = getCommonPageData;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _config = _interopRequireDefault(require("../config/config"));

var _utils = require("../utils/utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function addScriptTag() {
  if (!this || !this.src || !this.attributes || !this.type) return null;
  var src = this.src;
  var attr = this.attributes.join(' ');
  var type = this.type;
  return "<script src=\"".concat(src, "\" type=\"").concat(type, "\" ").concat(attr, "></script>");
}

function setCurrentPage(pageName) {
  if (!this || !this.currentPage) return null;
  var given = pageName.toLowerCase();
  var expected = this.currentPage.toLowerCase();
  return given === expected ? 'site-nav__active-tab' : '';
}

function getCommonPageData() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var user = data.user;
  var isAdmin = (user === null || user === void 0 ? void 0 : user.role) === 'admin' || false;
  return _objectSpread({
    BASE_URL: _config["default"].BASE_URL,
    APP_NAME: _config["default"].APP_NAME,
    THEME_COLOR: _config["default"].THEME_COLOR,
    isNewPaire_page: false,
    fn: {
      getUserProfilePicture: _utils.getUserProfilePicture
    },
    isAdmin: isAdmin
  }, data);
}