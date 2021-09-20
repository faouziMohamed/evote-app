"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNewPairPageData = getNewPairPageData;
exports.newPairPageData = exports.content = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: "Making sure you're secure",
    loadingMessage: 'Generating keys...',
    greeting: 'Hello',
    "continue": 'Continue'
  },
  fr: {
    pageTitle: "Assurez-vous d'être sécurisé",
    loadingMessage: 'Génération des clés...',
    greeting: 'Bonjour',
    "continue": 'Continuer'
  }
};
exports.content = content;
var metadata = {
  en: {
    title: 'Security upgrading',
    description: 'Activate vonting account',
    keywords: 'key generating, gpg, aes, rsa, asymetric, key'
  },
  fr: {
    title: 'Activer votre compte',
    description: 'Activer votre compte',
    keywords: 'activer, compte, gpg, aes, rsa, asymetric, key'
  }
};
var newPairPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['new-pair'],
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/newPair_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.newPairPageData = newPairPageData;

function getNewPairPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, newPairPageData), options)) || _objectSpread(_objectSpread({}, newPairPageData), options);
}