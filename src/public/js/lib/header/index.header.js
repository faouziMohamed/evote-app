import { useDropDown } from './header-drop-down';
import { useHeaderMenu } from './headerMenu';

export const useHeader = () => {
  useDropDown('user-profil-thumb', 'user-menu-card');
  useDropDown('lang-flag', 'lang-drop-down');
  useHeaderMenu();
};
