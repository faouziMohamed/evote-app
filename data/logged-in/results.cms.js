"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getResultsPageData = getResultsPageData;
exports.resultsPageData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Vote results'
  },
  fr: {
    pageTitle: 'Résultats de vote'
  }
};
var metadata = {
  en: {
    title: 'Vote results',
    description: 'Results of votes',
    keywords: 'vote, results, vote results'
  },
  fr: {
    title: 'Résultats de vote',
    description: 'Résultats des votes',
    keywords: 'vote, résultats, résultats de vote'
  }
};
var resultsPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['results'],
  toggle: {
    currentPage: 'results',
    setCurrentPage: _cms.setCurrentPage
  },
  inject: {
    headerScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: 'https://cdn.jsdelivr.net/npm/apexcharts',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }],
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/results_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.resultsPageData = resultsPageData;

function getResultsPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, resultsPageData), options)) || _objectSpread(_objectSpread({}, resultsPageData), options);
}