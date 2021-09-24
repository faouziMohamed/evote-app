import {
  checkInputsValidity,
  useRegisterFormValidation,
} from '../utils/auth-form.utils';
import {
  showErrorDialog,
  showSuccessDialog,
} from '../utils/modals/index.dialog';
import { addOneUserToCache, getUsersData } from '../utils/user-data.utils';
import { postData, strip } from '../utils/utils';
import { UserAddModal } from './add-user-modal';
import UserTable from './user-table';

export default class UserAdd {
  static form = null;

  constructor({ userTableObj = new UserTable() } = {}) {
    this.openModalBtn = document.querySelector('#openAddModal');
    this.modalContainer = document.querySelector('#admin-modal');
    this.contentRoot = document.querySelector('.main-content-root');
    this.userTable = userTableObj;
    this.modal = new UserAddModal();
    this.closeBtn = this.modal.getCancelBtn();
    this.submitBtn = this.modal.getAddUserBtn();
  }

  async render() {
    this.userTable.setData(await getUsersData());
    this.userTable.render();
    this.useAddUserModal();
  }

  reRenderUserTable() {
    this.userTable.reRender();
  }

  useAddUserModal() {
    if (!this.openModalBtn || !this.modalContainer || !this.contentRoot) return;

    this.openModalBtn.addEventListener('click', () =>
      this.handleOpenModalBtnClick(),
    );
    this.closeBtn.addEventListener('click', () => {
      this.modal.resetForm();
      this.handleCloseBtnCLick();
    });

    // submit button disabled by default
    this.submitBtn.disabled = true;
    this.submitBtn.addEventListener('click', (e) =>
      this.handleBtnSubmitAddNewUser(e),
    );
  }

  static getForm() {
    UserAdd.form = document.querySelector('#add-new-user-form');
    return UserAdd.form;
  }

  // Open button handler
  handleOpenModalBtnClick() {
    this.contentRoot.classList.add(['prevent-scroll'], ['blur']);
    this.modalContainer.classList.remove('hidden');
    this.modalContainer.append(this.modal.getDialog());
    useRegisterFormValidation();
  }

  // CLose button handler
  handleCloseBtnCLick() {
    this.modalContainer.classList.add('hidden');
    this.modalContainer.replaceChildren();
    this.contentRoot.classList.remove(['prevent-scroll'], ['blur']);
  }

  // Submit button handler
  async handleBtnSubmitAddNewUser(e) {
    e.preventDefault();
    if (checkInputsValidity()) {
      const response = await UserAdd.sendDataToServer();
      const actionSuccessCallback = this.#succesCallBack(response);
      UserAdd.useServerResponse({ ...response, actionSuccessCallback });
    } else {
      const msgError = 'Please fill correctly all the required fields!';
      showErrorDialog({ modalText: msgError });
    }
  }

  #succesCallBack(response) {
    return () => {
      addOneUserToCache(response?.user);
      this.reRenderUserTable();
      this.closeBtn?.click();
    };
  }

  static async sendDataToServer() {
    const data = UserAdd.readFormData();
    const res = await postData({ url: '/api/admin/users/add', data });
    const { error, data: serverResponse, user } = res;
    return { error, serverResponse, user };
  }

  static readFormData() {
    const form = UserAdd.getForm();
    if (!form) {
      const msgError =
        'An error occured, please contact a developer to resolve it!';
      return showErrorDialog({ modalText: msgError });
    }
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      data[key] = strip(value).trim();
    });
    const { role } = form.elements;
    const { userType } = form.elements;
    data.role = role.checked ? 'admin' : 'user';
    data.userType = userType.checked ? 'candidate' : 'voter';
    return data;
  }

  static useServerResponse({
    error,
    serverResponse,
    actionSuccessCallback = () => {},
    actionErrorCallback = () => {},
  }) {
    if (error) {
      showErrorDialog({ modalText: error });
      actionErrorCallback();
    } else {
      showSuccessDialog({ modalText: serverResponse });
      actionSuccessCallback();
    }
  }
}
