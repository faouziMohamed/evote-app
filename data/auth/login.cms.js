"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginPageData = getLoginPageData;
exports.loginPageData = exports.content = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Login to your account',
    accountNotActivated: 'Account is not activated yet?',
    activateAccount: 'Activate your account',
    newToUs: 'New to Evote App?',
    signUp: 'Sign up',
    usernameLabel: 'Username',
    emailLabel: 'Email',
    passwordLabel: 'Password',
    loggedIn: 'You are already logged in!',
    forgotPassword: 'Forgot password?',
    submitBtn: 'Connect'
  },
  fr: {
    pageTitle: 'Connectez-vous à votre compte',
    accountNotActivated: 'Votre compte n’est pas encore activé?',
    activateAccount: 'Activez votre compte',
    newToUs: 'Nouveau sur Evote App?',
    signUp: 'S’inscrire',
    usernameLabel: 'Nom d’utilisateur',
    emailLabel: 'Email',
    passwordLabel: 'Mot de passe',
    loggedIn: 'Vous êtes déjà connecté!',
    forgotPassword: 'Mot de passe oublié?',
    submitBtn: 'Connecter'
  }
};
exports.content = content;
var metadata = {
  en: {
    title: 'Login Page',
    description: 'Activate vonting account',
    keywords: 'Login, login page'
  },
  fr: {
    title: 'Page de connexion',
    description: 'Activer votre compte',
    keywords: 'Connexion, page de connexion'
  }
};
var loginPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['login']
};
exports.loginPageData = loginPageData;

function getLoginPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, loginPageData), options)) || _objectSpread(_objectSpread({}, loginPageData), options);
}