"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexAdminPageData = getIndexAdminPageData;
exports.indexAdminPageData = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _cms = require("../cms.utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var content = {
  en: {
    pageTitle: 'Users Management',
    pageDescription: 'All aspects related to the app users can be managed from this page',
    createUserBtn: 'Create User',
    allUsersBtn: 'All Users',
    normalUsersBtn: 'Normal Users',
    adminUsersBtn: 'Admin Users',
    candidatesBtn: 'Candidates',
    editUserBtn: 'Edit User',
    deleteUserBtn: 'Delete User',
    LockAccountBtn: 'Lock account',
    saveActionsBtn: 'Save Actions',
    usernameCol: 'Username',
    nameCol: 'Name',
    emailCol: 'Email',
    roleCol: 'Role',
    activatonCol: 'Activation',
    userTypeCol: 'User Type',
    voteStatusCol: 'Vote Status',
    cinCol: 'CIN'
  }
};
var metadata = {
  en: {
    title: 'Users Management',
    description: 'Admin page to manage different type of users and perform ' + 'some highlevel operations',
    keywords: 'candidates, details, descriptions'
  }
};
var indexAdminPageData = {
  lang: 'en',
  content: content,
  metadata: metadata,
  slug: ['admin'],
  toggle: {
    currentPage: 'admin',
    setCurrentPage: _cms.setCurrentPage
  },
  inject: {
    bodyScripts: [{
      addScriptTag: _cms.addScriptTag,
      src: '/js/admin_bundle.js',
      type: 'text/javascript',
      attributes: ['async', 'defer']
    }]
  }
};
exports.indexAdminPageData = indexAdminPageData;

function getIndexAdminPageData() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _cms.getCommonPageData)(_objectSpread(_objectSpread({}, indexAdminPageData), options)) || _objectSpread(_objectSpread({}, indexAdminPageData), options);
}