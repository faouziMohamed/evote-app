export const LoadSpinner = () => {
  const preloader = document.querySelector('#tabwindow-preloader');
  return {
    show: () => preloader?.classList.remove('hidden'),
    hide: () => preloader?.classList.add('hidden'),
  };
};
