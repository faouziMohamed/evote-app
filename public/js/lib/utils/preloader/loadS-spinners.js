"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadSpinner = void 0;

var LoadSpinner = function LoadSpinner() {
  var preloader = document.querySelector('#tabwindow-preloader');
  return {
    show: function show() {
      return preloader === null || preloader === void 0 ? void 0 : preloader.classList.remove('hidden');
    },
    hide: function hide() {
      return preloader === null || preloader === void 0 ? void 0 : preloader.classList.add('hidden');
    }
  };
};

exports.LoadSpinner = LoadSpinner;