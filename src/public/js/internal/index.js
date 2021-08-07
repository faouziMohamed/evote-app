export const handleHeaderMenu = () => {
  const input = document.querySelector('.checkbox-toggle-menu');
  if (!input) return;
  const ul = document.querySelector('.main-header-list');
  ul.classList.add('hidden');
  input.checked = false;
  input.addEventListener('change', () => {
    ul.classList.toggle('hidden');
  });

  const media = window.matchMedia('(min-width: 780px)');
  const listenMedia = (x) => {
    input.checked = false;
    if (x.matches) {
      ul.classList.remove('hidden');
    } else {
      ul.classList.add('hidden');
    }
  };
  media.addEventListener('change', listenMedia);
  listenMedia(media);
};

export const getDataFromCookie = (cookieName) =>
  document.cookie
    .split('; ')
    .find((token) => token.startsWith(cookieName))
    .split('=')[1];

export const redirectTo = (path) => {
  window.location.href = path;
};

export { handleAutoTypingTexts } from './autotext';
export { handleUserVote } from './vote';
