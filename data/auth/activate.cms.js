"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActivatePageData = getActivatePageData;
exports.activatePageData = exports.content = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Activate your account',
    haveAnAccount: 'Already have an account?',
    signIn: 'Sign in',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    usernameLabel: 'Username',
    birthdateLabel: 'Birthdate',
    cinLabel: 'CIN',
    submitBtn: 'Sign up'
  },
  fr: {}
};
exports.content = content;
var metadata = {
  en: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'activate,account, register page'
  },
  fr: {
    title: 'Activation Page',
    description: 'Activate vonting account',
    keywords: 'inscription,inscrire,inscrire page'
  }
};
var activatePageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['register'],
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/auth_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.activatePageData = activatePageData;

function getActivatePageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, activatePageData), options)) || _objectSpread(_objectSpread({}, activatePageData), options);
}