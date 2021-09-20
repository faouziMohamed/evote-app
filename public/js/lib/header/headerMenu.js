"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeaderMenu = void 0;

var useHeaderMenu = function useHeaderMenu() {
  var input = document.querySelector('.burger-menu__checkbox');
  var burgerMenu = document.querySelector('.burger-menu');
  var contentRoot = document.querySelector('.main-content-root');
  var leftSide = document.querySelector('.left-side');
  var leftSideParent = document.querySelector('.left-side-parent');
  if (!input || !burgerMenu) return;

  var toggle = function toggle() {
    return toggleStates(leftSide, contentRoot, burgerMenu);
  };

  addEventHandlers(input, leftSideParent, toggle);
  setDefaultStates(leftSide, contentRoot, burgerMenu, input);
};

exports.useHeaderMenu = useHeaderMenu;

function addEventHandlers(input, leftSideParent, toggle) {
  input.addEventListener('change', toggle);
  leftSideParent.addEventListener('click', closeLeftSide(input, toggle));
}

function closeLeftSide(input, toggle) {
  return function handleClose(e) {
    var classList = e.target.classList;
    if (!classList.contains('left-side-parent')) return;
    input.checked = false;
    toggle();
  };
}

function toggleStates(leftSide, contentRoot, burgerMenu) {
  leftSide.parentNode.classList.toggle('on-top');
  leftSide.classList.toggle('left-side__closed');
  contentRoot.classList.toggle('prevent-scroll');
  burgerMenu.classList.toggle('left-side__oppened');
}

function setDefaultStates(leftSide, contentRoot, burgerMenu, input) {
  leftSide.classList.add('left-side__closed');
  leftSide.classList.remove('hidden');
  contentRoot.classList.remove('prevent-scroll');
  burgerMenu.classList.remove('left-side__oppened');
  input.checked = false;
}