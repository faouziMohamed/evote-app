"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCandidatesPageData = getCandidatesPageData;
exports.candiatesPageData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'See candidates details'
  },
  fr: {
    pageTitle: 'Voir les détails des candidats'
  }
};
var metadata = {
  en: {
    title: 'Candiates details',
    description: 'Candiates details',
    keywords: 'candidates, details, descriptions'
  },
  fr: {
    title: 'Détails des candidats',
    description: 'Détails des candidats',
    keywords: 'candidats, détails, descriptions'
  }
};
var candiatesPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['candidates'],
  toggle: {
    currentPage: 'candidates',
    setCurrentPage: _cms.setCurrentPage
  },
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/candidates_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.candiatesPageData = candiatesPageData;

function getCandidatesPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, candiatesPageData), options)) || _objectSpread(_objectSpread({}, candiatesPageData), options);
}