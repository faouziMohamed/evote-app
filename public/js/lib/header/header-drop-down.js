"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useDropDown = useDropDown;

var _utils = require("../utils/utils");

function handleOpenCloseDropDown(clickClassName, dropDownClassName) {
  var dropDown = document.querySelector(".".concat(dropDownClassName));
  if (!dropDown) return;
  var clickToOpenBtn = document.querySelector(".".concat(clickClassName));
  dropDown.classList.add('hidden');
  clickToOpenBtn.addEventListener('click', function (e) {
    var className = e.target.className;
    if (className !== clickClassName) return;
    dropDown.classList.toggle('hidden');
  });
}

function handleClosingDropDown(clickClassName, dropDownClassName) {
  var dropDown = document.querySelector(".".concat(dropDownClassName));
  if (!dropDown) return;
  var clickToOpenIMGBtn = document.querySelector(".".concat(clickClassName));
  var imgClassName = clickToOpenIMGBtn.className;
  document.body.addEventListener('click', function (e) {
    if (imgClassName === e.target.className) return;
    dropDown.classList.add('hidden');
  });
}

function useLangDropDown() {
  var langMap = {
    en: 'english',
    fr: 'french'
  };
  var langDropDown = document.querySelector('.lang-drop-down');
  initialiseLangDropDown(langMap);
  var handler = changeLang(langDropDown, langMap);
  handleLangChanging(handler);
}

function initialiseLangDropDown(langMap) {
  if (!localStorage.getItem('lang')) {
    localStorage.setItem('lang', 'en');
    updateImgSource(langMap.en);
  } else {
    updateImgSource(langMap[localStorage.getItem('lang')]);
  }
}

function handleLangChanging(handler) {
  var elements = document.querySelectorAll('.lang-item');
  if (!elements.length) return;
  elements.forEach(function (node) {
    node.addEventListener('click', handler);
  });
}

function changeLang(dropDown, langMap) {
  return function (e) {
    var lang = e.target.dataset.lang;
    if (lang) localStorage.setItem('lang', lang);
    dropDown.classList.add('hidden');
    updateImgSource(langMap[lang]);
    (0, _utils.reloadPage)();
  };
}

function updateImgSource(lang) {
  var langImg = document.querySelector('.lang-flag'); // This regex match a url ending with a string.svg (english.svg or french.svg)

  var findLangRegex = /(^.*\/)\w+(.svg)$/g;
  var imgSrc = langImg.src.replace(findLangRegex, "$1".concat(lang, "$2"));
  langImg.src = imgSrc;
  langImg.alt = (0, _utils.capitalize)(lang);
}

function useDropDown(clickClassName, dropDownClassName) {
  handleOpenCloseDropDown(clickClassName, dropDownClassName);
  handleClosingDropDown(clickClassName, dropDownClassName);
  useLangDropDown();
}