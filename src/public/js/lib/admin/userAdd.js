import {
  checkInputsValidity,
  useRegisterFormValidation,
} from '../utils/auth-form.utils';
import {
  showErrorDialog,
  showSuccessDialog,
} from '../utils/modals/index.dialog';
import { postData, strip } from '../utils/utils';
import { UserAddModal } from './userAddModal';

export const useAddUserModal = () => {
  const openModalBtn = document.querySelector('#openAddModal');
  const modalContainer = document.querySelector('#admin-modal');
  const contentRoot = document.querySelector('.main-content-root');

  if (!openModalBtn || !modalContainer || !contentRoot) return;
  const modal = new UserAddModal();
  const [closeBtn, submitBtn] = [modal.getCancelBtn(), modal.getAddUserBtn()];

  openModalBtn.addEventListener('click', () =>
    handleOpenModalBtnClick(contentRoot, modalContainer, modal),
  );

  closeBtn.addEventListener('click', () => {
    modal.resetForm();
    handleCloseBtnCLick(modalContainer, contentRoot);
  });

  // submit button disabled by default
  submitBtn.disabled = true;
  submitBtn.addEventListener('click', (e) =>
    handleBtnSubmitAddNewUser(e, closeBtn),
  );
};

// CLose button handler
function handleCloseBtnCLick(modalContainer, contentRoot) {
  modalContainer.classList.add('hidden');
  modalContainer.replaceChildren();
  contentRoot.classList.remove(['prevent-scroll'], ['blur']);
}

// Open button handler
function handleOpenModalBtnClick(contentRoot, modalContainer, modal) {
  contentRoot.classList.add(['prevent-scroll'], ['blur']);
  modalContainer.classList.remove('hidden');
  modalContainer.append(modal.getDialog());
  useRegisterFormValidation();
}

// Submit button handler
async function handleBtnSubmitAddNewUser(e, closeBtn) {
  e.preventDefault();
  if (checkInputsValidity()) {
    const response = await sendDataToServer();
    const actionSuccessCallback = () => closeBtn?.click();
    useServerResponse({ ...response, actionSuccessCallback });
  } else {
    const msgError = 'Please fill correctly all the required fields!';
    showErrorDialog({ modalText: msgError });
  }
}

function useServerResponse({
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

async function sendDataToServer() {
  const data = readFormData();
  const { error, data: serverResponse } = await postData({
    url: '/api/admin/users/add',
    data,
  });

  return { error, serverResponse };
}

function readFormData() {
  const form = document.querySelector('#add-new-user-form');
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

  data.role = form.elements.role.checked ? 'admin' : 'user';
  data.userType = form.elements.userType.checked ? 'candidate' : 'voter';
  return data;
}
