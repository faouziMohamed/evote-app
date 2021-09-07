import {
  showErrorDialog,
  showSuccessDialog,
} from '../utils/modals/index.dialog';
import {
  getData,
  getEmailRegex,
  getUsernameRegex,
  postData,
  strip,
} from '../utils/utils';
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

  closeBtn.addEventListener('click', () =>
    handleCloseBtnCLick(modalContainer, contentRoot),
  );

  // submit button disabled by default
  submitBtn.disabled = true;
  submitBtn.addEventListener('click', handleBtnSubmitAddNewUser);
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
  useFormValidation();
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

// Form validation handlers
function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

function handleInputValueError(input, errorElement) {
  const placeholder = input.getAttribute('placeholder');

  input.addEventListener('input', async () => {
    if (input.value.trim() === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      await handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', async () => {
    if (input.value.trim() === '') {
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
    if (input.value.trim() === '') {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else if (!regex.test(input.value.trim())) {
      const message = `Invalid ${placeholder}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = ['email', 'username'].includes(input.name);
      await handleValidInput(input, errorElement, checkExists);
      // await handleValidInput(input, errorElement);
    }
  });

  input.addEventListener('blur', async () => {
    if (input.value.trim() === '' || !regex.test(input.value.trim())) {
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
    input.value.trim() !== '' && input.classList.contains('is-valid');
  return [...inputs].every(isValid);
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
    // eslint-disable-next-line no-console
    console.log(error);
  }
}

async function verifyValueIfUsed(input) {
  const value = input.value.trim();
  const url = `/api/users/verify/${input.name}/${value}`;
  const { data: exist } = await getData({ url });
  return !!exist;
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

// Submit button handler
async function handleBtnSubmitAddNewUser(e) {
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
    data[key] = strip(value).trim();
  });

  data.isAdmin = form.elements.isAdmin.checked;
  data.isCandidate = form.elements.isCandidate.checked;
  return data;
}
