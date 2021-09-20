import Config from '../config/config';
import { getUserProfilePicture } from '../utils/utils';

export function addScriptTag() {
  if (!this || !this.src || !this.attributes || !this.type) return null;
  const { src } = this;
  const attr = this.attributes.join(' ');
  const { type } = this;
  return `<script src="${src}" type="${type}" ${attr}></script>`;
}

export function setCurrentPage(pageName) {
  if (!this || !this.currentPage) return null;
  const given = pageName.toLowerCase();
  const expected = this.currentPage.toLowerCase();
  return given === expected ? 'site-nav__active-tab' : '';
}

export function getCommonPageData(data = {}) {
  const { user } = data;
  const isAdmin = user?.role === 'admin' || false;
  return {
    BASE_URL: Config.BASE_URL,
    APP_NAME: Config.APP_NAME,
    THEME_COLOR: Config.THEME_COLOR,
    isNewPaire_page: false,
    fn: { getUserProfilePicture },
    isAdmin,
    ...data,
  };
}
