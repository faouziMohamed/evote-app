import { LoadSpinner } from '../utils/preloader/loadS-spinners';
import { addUsersToCache, getUsersFromCache } from '../utils/user-data.utils';
import { UserTableRow } from './user-table-row';

export default class UserTable {
  constructor({ data } = {}) {
    this.tabBtns = [...document.querySelectorAll('.tab-btn')] || [];
    this.tBody = document.querySelector('.users-table-body');
    this.checkAllIpunts = document.querySelector('#checkbox-all');
    this.data = data;
    this.expectedUsersFilters = ['all', 'admin', 'user', 'candidate'];
    this.spinner = LoadSpinner();
  }

  render() {
    this.spinner.show();
    this.useUserTable();
    addUsersToCache(this.data);
    this.spinner.hide();
  }

  setData(data) {
    this.data = data;
  }

  async reRender() {
    this.data = getUsersFromCache();
    this.render();
  }

  getData() {
    return this.data;
  }

  useUserTable() {
    if (!this.tabBtns.length || (!this.tBody && !this.data)) return;
    this.attachEventsToTabsButton();
    this.attachEventToCheckAllInputs();
    this.useUserFilter('all');
  }

  attachEventToCheckAllInputs() {
    this.checkAllIpunts.addEventListener('change', (e) => {
      const setChecked = (checkbox) => {
        checkbox.checked = e.target.checked;
      };
      this.spinner.show();
      const checkboxes = document.querySelectorAll('.user-row-checkbox');
      checkboxes.forEach(setChecked);
      this.spinner.hide();
    });
  }

  attachEventsToTabsButton() {
    this.setActiveButton = (el) => el.classList.add('tab-active');
    this.unsetActiveButton = (el) => el.classList.remove('tab-active');

    this.tabBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.switchToActiveButton(e);
        const { filter } = e.target.dataset || 'all';
        this.useUserFilter(filter);
      });
    });
  }

  switchToActiveButton(e) {
    const activeBtn = this.#getActiveTabButton();
    if (activeBtn !== e.target) {
      this.unsetActiveButton(activeBtn);
      this.setActiveButton(e.target);
      this.checkAllIpunts.checked = false;
    }
  }

  #getActiveTabButton() {
    return this.tabBtns.find((btn) => btn.classList.contains('tab-active'));
  }

  useUserFilter(filter) {
    this.tBody.replaceChildren();
    this.data.forEach((user) => this.filterUsers({ user, by: filter }));
  }

  async filterUsers({ by = 'all', user }) {
    const isNotValidFilter = !this.expectedUsersFilters.includes(by);
    if (isNotValidFilter) {
      throw new Error('Invalid filter');
    }
    const row = new UserTableRow(user);
    row.attachEventTo('checkbox', 'click', () => this.useCheckBoxAll());

    const isAdmin = (str) => str === 'admin';
    const isNormalUser = (str) => str === 'user';
    const isCandidate = (str) => str === 'candidate';

    if (by === 'all') {
      this.tBody.append(row.getRow());
    } else if ([by, user.role].every(isAdmin)) {
      this.tBody.append(row.getRow());
    } else if ([by, user.role].every(isNormalUser)) {
      this.tBody.append(row.getRow());
    } else if ([by, user.userType].every(isCandidate)) {
      this.tBody.append(row.getRow());
    }
  }

  useCheckBoxAll() {
    const checkboxes = document.querySelectorAll('.user-row-checkbox');
    const checkVisual = document.querySelector('#checkbox-all--visual');

    const inputs = [...checkboxes];
    const areAllChecked = inputs.every((input) => input.checked);
    const atLeastOneChecked = inputs.some((input) => input.checked);
    if (!checkVisual) return;

    if (areAllChecked) {
      this.checkAllIpunts.checked = true;
      checkVisual.classList.remove('partially-checked');
    } else if (atLeastOneChecked) {
      this.checkAllIpunts.checked = true;
      checkVisual.classList.add('partially-checked');
    } else {
      this.checkAllIpunts.checked = false;
      checkVisual.classList.remove('partially-checked');
    }
  }
}
