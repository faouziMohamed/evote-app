"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getActivationStatusPageDataPageData = getActivationStatusPageDataPageData;
exports.activationStatusPageData = exports.content = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Activaion status'
  },
  fr: {
    pageTitle: 'Statut d’activation'
  }
};
exports.content = content;
var metadata = {
  en: {
    title: 'Activation status',
    description: 'An error occurred while trying to activate your account.',
    keywords: 'activation status, error'
  },
  fr: {
    title: 'Statut d’activation',
    description: 'Une erreur est survenue lors de l’activation de votre compte.',
    keywords: 'statut d’activation, erreur'
  }
};
var activationStatusPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['activation-status'],
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/auth_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.activationStatusPageData = activationStatusPageData;

function getActivationStatusPageDataPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, activationStatusPageData), options)) || _objectSpread(_objectSpread({}, activationStatusPageData), options);
}