import { AlertDialog } from '../utils/modals/alerte-dialog';
import {
  getData,
  getEmailRegex,
  getUsernameRegex,
  postData,
  strip,
  stripStartEnd,
} from '../utils/utils';
import { UserAddModal } from './userAddModal';

export const useAddUserModal = () => {
  const openModalBtn = document.querySelector('#openAddModal');
  const modalContainer = document.querySelector('#admin-modal');
  const contentRoot = document.querySelector('.main-content-root');

  if (!openModalBtn || !modalContainer || !contentRoot) return;
  const modal = new UserAddModal();
  const [closeBtn, submitBtn] = [modal.getCancelBtn(), modal.getAddUserBtn()];

  openModalBtn.addEventListener('click', () => {
    contentRoot.classList.add(['prevent-scroll'], ['blur']);
    modalContainer.classList.remove('hidden');
    modalContainer.append(modal.getDialog());
    useFormValidation();
  });

  closeBtn.addEventListener('click', () => {
    modalContainer.classList.add('hidden');
    modalContainer.replaceChildren();
    contentRoot.classList.remove(['prevent-scroll'], ['blur']);
  });
  submitBtn.addEventListener('click', async (e) => handleAddNewUser(e));
  submitBtn.disabled = true;
};

async function handleAddNewUser(e) {
  e.preventDefault();

  if (checkInputsValidity()) {
    await sendDataToServer();
  } else {
    const msgError = 'Please fill correctly all the required fields!';
    showErrorDialog({ modalText: msgError });
  }
}

async function sendDataToServer() {
  const data = readFormData();
  const { error, data: serverResponse } = await postData({
    url: '/api/admin/users/add',
    data,
  });

  if (error) {
    showErrorDialog({ modalText: error });
  } else {
    showSuccessDialog({ modalText: serverResponse });
  }
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
    data[key] = stripStartEnd(strip(value));
  });

  data.isAdmin = form.elements.isAdmin.checked;
  data.isCandidate = form.elements.isCandidate.checked;
  return data;
}

function useFormValidation() {
  const [firstName, firstNameFeedbackEL] = getInputAndErorrElement('firstname');
  const [lastName, lastNameFeedbackEL] = getInputAndErorrElement('lastname');
  const [email, emailFeedbackEL] = getInputAndErorrElement('email');
  const [username, usernameFeedbackEL] = getInputAndErorrElement('username');
  const emailRegex = getEmailRegex();
  const usernameRegex = getUsernameRegex();

  handleInputValueError(firstName, firstNameFeedbackEL);
  handleInputValueError(lastName, lastNameFeedbackEL);
  handleInputWithRegexValueError(username, usernameFeedbackEL, usernameRegex);
  handleInputWithRegexValueError(email, emailFeedbackEL, emailRegex);
}

function handleInputValueError(input, errorElement) {
  const placeholder = input.getAttribute('placeholder');

  input.addEventListener('input', async () => {
    if (stripStartEnd(input.value) === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      await handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', async () => {
    if (stripStartEnd(input.value) === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      await handleValidInput(input, errorElement);
    }
  });
}

function handleInputWithRegexValueError(input, errorElement, regex) {
  const placeholder = input.getAttribute('placeholder');
  input.addEventListener('input', async () => {
    if (stripStartEnd(input.value) === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else if (!regex.test(stripStartEnd(input.value))) {
      const message = `Invalid ${placeholder}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      await handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', async () => {
    if (
      stripStartEnd(input.value) === '' ||
      !regex.test(stripStartEnd(input.value))
    ) {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = ['email', 'username'].includes(input.name);
      await handleValidInput(input, errorElement, checkExists);
    }
  });
}

function checkInputsValidity() {
  const inputs = document.querySelectorAll('.form-control:not(.optional)');
  const isValid = (input) =>
    stripStartEnd(input.value) !== '' && input.classList.contains('is-valid');
  return [...inputs].every(isValid);
}

function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

function handleInvalidInput(input, errorElement, message) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  errorElement.textContent = message;
  input.setCustomValidity(message);
  document.querySelector('#btn-submit').disabled = true;
}

async function handleValidInput(input, errorElement, check = false) {
  try {
    if (check && (await verifyValueIfUsed(input))) {
      const message = `${input.value} is already taken`;
      handleInvalidInput(input, errorElement, message);
      return;
    }
    removeErrorMessages(input, errorElement);
    activateSubmitButton();
  } catch (error) {
    console.log(error);
  }
}

function removeErrorMessages(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  errorElement.textContent = '✔';
  input.setCustomValidity('');
}

function activateSubmitButton() {
  const areInputsValid = checkInputsValidity();
  if (areInputsValid) {
    document.querySelector('#btn-submit').disabled = false;
  }
}

async function verifyValueIfUsed(input) {
  const value = stripStartEnd(input.value);
  const url = `/api/users/verify/${input.name}/${value}`;
  const { data: exist } = await getData({ url });
  return !!exist;
}

function showDialog({
  modalType = 'success',
  modalTitle = 'Success',
  modalOkBtnText = 'Done',
  modalText = 'Success',
}) {
  const options = {
    modalType,
    modalTitle,
    modalOkBtnText,
    modalText,
  };
  const dialog = new AlertDialog({ ...options });
  const dialogParent = dialog.getDialogWithParent();
  dialog.attachEventsTo('btnOk', 'click', () =>
    dialogParent.remove(dialogParent),
  );
  document.querySelector('.main-content')?.append(dialogParent);
}

function showSuccessDialog({
  modalText,
  modalOkBtnText = 'Close',
  modalTitle = 'User added',
}) {
  showDialog({
    modalType: 'success',
    modalOkBtnText,
    modalTitle,
    modalText,
  });
}

function showErrorDialog({
  modalTitle = 'Error',
  modalOkBtnText = 'Ok',
  modalText = 'An error occured, please retry!',
}) {
  showDialog({ modalType: 'error', modalTitle, modalOkBtnText, modalText });
}
