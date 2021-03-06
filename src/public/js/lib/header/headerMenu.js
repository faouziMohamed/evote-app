export const useHeaderMenu = () => {
  const input = document.querySelector('.burger-menu__checkbox');
  const burgerMenu = document.querySelector('.burger-menu');
  const contentRoot = document.querySelector('.main-content-root');
  const leftSide = document.querySelector('.left-side');
  const leftSideParent = document.querySelector('.left-side-parent');
  if (!input || !burgerMenu) return;

  const toggle = () => toggleStates(leftSide, contentRoot, burgerMenu);
  addEventHandlers(input, leftSideParent, toggle);
  setDefaultStates(leftSide, contentRoot, burgerMenu, input);
};

function addEventHandlers(input, leftSideParent, toggle) {
  input.addEventListener('change', toggle);
  leftSideParent.addEventListener('click', closeLeftSide(input, toggle));
}

function closeLeftSide(input, toggle) {
  return function handleClose(e) {
    const { classList } = e.target;
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
