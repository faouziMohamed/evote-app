// import { isEmpty } from 'lodash';

import {
  getCINRegex,
  getData,
  getEmailRegex,
  getPasswordRegex,
  getUsernameRegex,
  isEmpty,
  isString,
  newElement,
  removeExtraSpaces,
} from './utils';

export function useRegisterFormValidation() {
  const btnSubmit = document.querySelector('#btn-submit');
  if (btnSubmit) btnSubmit.disabled = true;
  // Some time fields are automatically filled by the browser, check if everything is Ok
  activateSubmitButton('btn-submit');
  const [firstName, firstNameFeedbackEL] = getInputAndErorrElement('firstname');
  const [lastName, lastNameFeedbackEL] = getInputAndErorrElement('lastname');
  const [email, emailFeedbackEL] = getInputAndErorrElement('email');
  const [username, usernameFeedbackEL] = getInputAndErorrElement('username');
  const [password, passwordFeedbackEL] = getInputAndErorrElement('password');
  const [cin, cinFeedbackEL] = getInputAndErorrElement('cin');
  const [emailRegex, usernameRegex] = [getEmailRegex(), getUsernameRegex()];
  const [cinRegex, passwordRegex] = [getCINRegex(), getPasswordRegex()];
  const uniqueElements = [email?.name, username?.name, cin?.name].filter(
    (str) => str,
  );
  const isOkExistEl = [email?.name, cin?.name].filter((str) => str);

  if (firstName) handleInputValueError(firstName, firstNameFeedbackEL);
  if (lastName) handleInputValueError(lastName, lastNameFeedbackEL);

  if (cin) {
    handleInputWithRegexValueError({
      input: cin,
      errorElement: cinFeedbackEL,
      regex: cinRegex,
      uniqueElements,
      isOkExistEl,
    });
  }
  if (email) {
    handleInputWithRegexValueError({
      input: email,
      errorElement: emailFeedbackEL,
      regex: emailRegex,
      uniqueElements,
      isOkExistEl,
    });
  }
  if (username) {
    handleInputWithRegexValueError({
      input: username,
      errorElement: usernameFeedbackEL,
      regex: usernameRegex,
      uniqueElements,
    });
  }

  if (password) {
    handleInputWithRegexValueError({
      input: password,
      errorElement: passwordFeedbackEL,
      regex: passwordRegex,
    });
  }
}

// Form validation handlers
export function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

export function handleInputValueError(input, errorElement) {
  const inputName = input.dataset?.name || '';
  const verify = async () => {
    if (isEmpty(input.value)) {
      const message = `${inputName} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      await handleValidInput(input, errorElement);
    }
  };
  ['input', 'blur'].forEach((event) => input.addEventListener(event, verify));
}

export function handleInputWithRegexValueError({
  input,
  errorElement,
  regex,
  uniqueElements = ['username'],
  isOkExistEl = [],
}) {
  let watchList = [];
  if (uniqueElements)
    watchList = isString(uniqueElements) ? [uniqueElements] : uniqueElements;
  const params = { input, errorElement, regex, watchList, isOk: false };
  params.isOk = watchList.every((el) => isOkExistEl.includes(el));
  [attachInputEvent, attachBlurEvent].forEach((fn) => fn(params));
}

function attachInputEvent({ input, errorElement, regex, watchList, isOk }) {
  const inputName = input.dataset?.name || '';
  input.addEventListener('input', async () => {
    const value = removeExtraSpaces(input.value);
    if (isEmpty(value)) {
      const message = `${inputName} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else if (!regex.test(value)) {
      let message = `Invalid ${inputName}`;
      if (inputName?.toLocaleLowerCase() === 'password') {
        message = validatePassword(value, message);
      } else message = `Invalid ${inputName}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = watchList.includes(input.name);
      await handleValidInput(input, errorElement, checkExists, isOk);
    }
  });
}

function validatePassword(value) {
  const msg = newElement('p', {}, ['The password must contain : ']);
  const lis = [];
  const specialChars = ['@', '#', '%', '^', '$', '!', '%', '*', '?', '&'];
  if (value.length < 7)
    lis.push(newElement('li', {}, [`at last 7 characters`]));
  if (value.search(/[a-z]/) < 0)
    lis.push(newElement('li', {}, [`at least 1 lowercase letter`]));
  if (value.search(/[A-Z]/) < 0)
    lis.push(newElement('li', {}, [`at least 1 uppercase letter`]));

  if (value.search(/[0-9]/) < 0)
    lis.push(newElement('li', {}, [`at least 1 number`]));

  if (value.search(RegExp(`[${specialChars.join('')}]`)) < 0) {
    lis.push(
      newElement('li', {}, [
        `at least 1 special character in : ${specialChars.join(' ')}`,
      ]),
    );
  }
  const ul = newElement('ul', { class: 'list-msg' }, lis);
  return newElement('div', {}, [msg, ul]);
}

function attachBlurEvent({ input, errorElement, regex, watchList, isOk }) {
  const inputName = input.dataset?.name || '';
  input.addEventListener('blur', async () => {
    const value = removeExtraSpaces(input.value);
    if (isEmpty(value) || !regex.test(value)) {
      let message = `${inputName} is invalid and is required`;
      if (inputName?.toLocaleLowerCase() === 'password') {
        message = validatePassword(value, message);
      } else message = `Invalid ${inputName}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = watchList.includes(input.name);

      await handleValidInput(input, errorElement, checkExists, isOk);
    }
  });
}

export function checkInputsValidity(className = 'form-control:not(.optional)') {
  const inputs = document.querySelectorAll(`.${className}`);
  const isCorrect = (input) =>
    input.classList.contains('is-valid') ||
    !input.classList.contains('is-invalid');

  const isValid = (input) => !isEmpty(input.value) && isCorrect(input);
  return [...inputs].every(isValid);
}

function handleInvalidInput(
  input,
  errorElement,
  message,
  submitBtnId = 'btn-submit',
) {
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
  if (message) {
    errorElement?.replaceChildren(message);
    input.setCustomValidity(message);
  }
  document.querySelector(`.root`)?.classList.add('root_error');

  const submitButton = document.querySelector(`#${submitBtnId}`);
  if (submitButton) submitButton.disabled = true;
}

async function handleValidInput(
  input,
  errorElement,
  check = false,
  isOk = false,
) {
  try {
    if (check && (await verifyValueIfUsed(input)) && !isOk) {
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
  const value = removeExtraSpaces(input.value);
  const url = `/api/users/verify/${input.name}/${value}`;
  const { data: exist } = await getData({ url });
  return exist;
}

function removeErrorMessages(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
  document.querySelector(`.root`)?.classList.remove('root_error');
  if (errorElement) errorElement.textContent = '✔';
  input.setCustomValidity('');
}

function activateSubmitButton(id = 'btn-submit') {
  const areInputsValid = checkInputsValidity();

  if (areInputsValid) {
    const submitButton = document.querySelector(`#${id}`);
    if (submitButton) submitButton.disabled = false;
  }
}
