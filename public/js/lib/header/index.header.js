"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeader = void 0;

var _headerDropDown = require("./header-drop-down");

var _headerMenu = require("./headerMenu");

var useHeader = function useHeader() {
  (0, _headerDropDown.useDropDown)('user-profil-thumb', 'user-menu-card');
  (0, _headerDropDown.useDropDown)('lang-flag', 'lang-drop-down');
  (0, _headerMenu.useHeaderMenu)();
};

exports.useHeader = useHeader;