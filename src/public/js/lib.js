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

export const handleUserVote = () => {
  const buttons = document.querySelectorAll('.vote-btn');
  if (!buttons) return;
  const inputs = document.querySelectorAll('.vote-checkbox');
  inputs.forEach((input, index) => {
    // eslint-disable-next-line no-param-reassign
    input.checked = false;
    buttons[index].classList.remove('enabled');
    input.addEventListener('change', () => {
      buttons[index].classList.toggle('enabled');
    });
  });
};
