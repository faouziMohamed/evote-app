"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getVotePageData = getVotePageData;
exports.votePageData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Time to make a choice'
  },
  fr: {
    pageTitle: 'Temps à choisir'
  }
};
var metadata = {
  en: {
    title: 'Vote your favorite candidate',
    description: 'Vote your favorite candidate',
    keywords: 'vote, choose, make choice'
  },
  fr: {
    title: 'Votez pour votre candidat préféré',
    description: 'Votez pour votre candidat préféré',
    keywords: 'vote, choisir, choisir votre candidat'
  }
};
var votePageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['vote'],
  toggle: {
    currentPage: 'vote',
    setCurrentPage: _cms.setCurrentPage
  },
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/votes_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.votePageData = votePageData;

function getVotePageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, votePageData), options)) || _objectSpread(_objectSpread({}, votePageData), options);
}