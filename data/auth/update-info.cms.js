"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUpdateInfoPageData = getUpdateInfoPageData;
exports.updateInfoPageData = exports.content = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Update your Informations',
    updateMsg: 'Now you can update your informations before finalizing your activation.',
    firstNameLabel: 'First name',
    lastNameLabel: 'Last name',
    passwordLabel: 'Password',
    usernameLabel: 'Username',
    submitBtn: 'Finalize Activation'
  },
  fr: {
    pageTitle: 'Mettre à jour vos informations',
    updateMsg: 'Maintenant vous pouvez mettre à jour vos informations avant de finaliser votre activation.',
    firstNameLabel: 'Prénom',
    lastNameLabel: 'Nom',
    passwordLabel: 'Mot de passe',
    usernameLabel: 'Nom d’utilisateur',
    submitBtn: 'Finaliser l’activation'
  }
};
exports.content = content;
var metadata = {
  en: {
    title: 'Update information',
    description: 'Update your informations before finalizing your activation.',
    keywords: 'update, informations, activation'
  },
  fr: {
    title: 'Mettre à jour les informations',
    description: 'Mettre à jour vos informations avant de finaliser votre activation.',
    keywords: 'mettre à jour, informations, activation'
  }
};
var updateInfoPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['update-info'],
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/auth_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.updateInfoPageData = updateInfoPageData;

function getUpdateInfoPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, updateInfoPageData), options)) || _objectSpread(_objectSpread({}, updateInfoPageData), options);
}