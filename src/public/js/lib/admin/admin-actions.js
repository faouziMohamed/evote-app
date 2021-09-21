export default class AdminActions {
  static #btnsParent = document.querySelector('#admin-actions');
  static #editBtn = AdminActions.#btnsParent.querySelector('#edit-user');
  static #lockBtn = AdminActions.#btnsParent.querySelector('#lock-user');
  static #deleteBtn = AdminActions.#btnsParent.querySelector('#delete-user');
  static #saveBtn = AdminActions.#btnsParent.querySelector('#save-changes');
  static selectedRow = [];

  static getEditBtn() {
    return AdminActions.#editBtn;
  }

  static getLockBtn() {
    return AdminActions.#lockBtn;
  }

  static getDeleteBtn() {
    return AdminActions.#deleteBtn;
  }

  static getSaveBtn() {
    return AdminActions.#saveBtn;
  }

  static getBtns() {
    return {
      edit: AdminActions.#editBtn,
      lock: AdminActions.#lockBtn,
      remove: AdminActions.#deleteBtn,
      save: AdminActions.#saveBtn,
    };
  }

  static hide() {
    AdminActions.#btnsParent.classList.add('hidden');
  }

  static show() {
    AdminActions.#btnsParent.classList.remove('hidden');
  }

  static hideBtn(btnName) {
    AdminActions.getBtns()[btnName].classList.add('hidden');
  }

  static showBtn(btnName) {
    AdminActions.getBtns()[btnName].classList.remove('hidden');
  }

  static toggleBtn(btnName) {
    AdminActions.getBtns()[btnName].classList.toggle('hidden');
  }

  static toggleBtns() {
    Object.keys(AdminActions.getBtns()).forEach((btnName) => {
      AdminActions.toggleBtn(btnName);
    });
  }

  static showAllBtns() {
    Object.keys(AdminActions.getBtns()).forEach((btnName) => {
      AdminActions.showBtn(btnName);
    });
  }

  static hideAllBtns() {
    Object.keys(AdminActions.getBtns()).forEach((btnName) => {
      AdminActions.hideBtn(btnName);
    });
  }
}

/*   
<div class="admin-actions hiddden" id="admin-actions">
  <button class="btn btn-affirmative actions-edit" id="edit-user">
    <i class="fad fa-edit"></i>
    <span class="actions--text"><%= content[lang].editUserBtn %> </span>
  </button>
  <button class="btn btn-warning action-lock" id="lock-user">
    <i class="fad fa-user-lock"></i>
    <span class="actions--text"><%= content[lang].LockAccountBtn %></span>
  </button>
  <button class="btn btn-danger action-delete" id="delete-user">
    <i class="fad fa-trash-alt"></i>
    <span class="actions--text"><%= content[lang].deleteUserBtn %></span>
  </button>

  <button class="btn btn-secondary action-save" id="save-changes">
    <i class="fad fa-trash-alt"></i>
    <span class="actions--text"><%= content[lang].saveActionsBtn %></span>
  </button>
</div> 
*/
