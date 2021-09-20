// import { isEmpty } from 'lodash';

import {
  getData,
  getEmailRegex,
  getUsernameRegex,
  isEmpty,
  isString,
  removeExtraSpaces,
  strip,
} from './utils';

export function useRegisterFormValidation() {
  const btnSubmit = document.querySelector('#btn-submit');
  if (btnSubmit) btnSubmit.disabled = true;
  const [firstName, firstNameFeedbackEL] = getInputAndErorrElement('firstname');
  const [lastName, lastNameFeedbackEL] = getInputAndErorrElement('lastname');
  const [email, emailFeedbackEL] = getInputAndErorrElement('email');
  const [username, usernameFeedbackEL] = getInputAndErorrElement('username');
  const emailRegex = getEmailRegex();
  const usernameRegex = getUsernameRegex();
  const uniqueElNames = [String(email?.name), String(username?.name)];
  handleInputValueError(firstName, firstNameFeedbackEL);
  handleInputValueError(lastName, lastNameFeedbackEL);

  handleInputWithRegexValueError({
    input: username,
    errorElement: usernameFeedbackEL,
    regex: usernameRegex,
    uniqueElements: uniqueElNames,
  });

  handleInputWithRegexValueError({
    input: email,
    errorElement: emailFeedbackEL,
    regex: emailRegex,
    uniqueElements: uniqueElNames,
  });
}

// Form validation handlers
export function getInputAndErorrElement(id) {
  const input = document.querySelector(`#${id}`);
  const inputFeedbackEL = document.querySelector(`#${id} ~ .invalid-feedback`);
  return [input, inputFeedbackEL];
}

export function handleInputValueError(input, errorElement) {
  const placeholder = input.getAttribute('placeholder');
  const verify = async () => {
    if (isEmpty(input.value)) {
      const message = `${placeholder} is invalid and is required`;
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
}) {
  let watchList = [];
  if (uniqueElements)
    watchList = isString(uniqueElements) ? [uniqueElements] : uniqueElements;
  const params = { input, errorElement, regex, watchList };
  [attachInputEvent, attachBlurEvent].forEach((fn) => fn(params));
}

function attachInputEvent({ input, errorElement, regex, watchList }) {
  const placeholder = input.getAttribute('placeholder');
  input.addEventListener('input', async () => {
    const value = removeExtraSpaces(input.value);
    if (isEmpty(value)) {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else if (!regex.test(value)) {
      const message = `Invalid ${placeholder}`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = watchList.includes(input.name);
      await handleValidInput(input, errorElement, checkExists);
    }
  });
}

function attachBlurEvent({ input, errorElement, regex, watchList }) {
  const placeholder = input.getAttribute('placeholder');
  input.addEventListener('blur', async () => {
    const value = removeExtraSpaces(input.value);
    if (isEmpty(value) || !regex.test(value)) {
      const message = `${placeholder} is invalid and is required`;
      handleInvalidInput(input, errorElement, message);
    } else {
      const checkExists = watchList.includes(input.name);
      await handleValidInput(input, errorElement, checkExists);
    }
  });
}

export function checkInputsValidity(className = 'form-control:not(.optional)') {
  const inputs = document.querySelectorAll(`.${className}`);
  const isValid = (input) =>
    strip(input.value).trim() !== '' && input.classList.contains('is-valid');
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
    if (errorElement) errorElement.textContent = message;
    input.setCustomValidity(message);
  }
  const submitButton = document.querySelector(`#${submitBtnId}`);
  if (submitButton) submitButton.disabled = true;
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
  const value = removeExtraSpaces(input.value);
  const url = `/api/users/verify/${input.name}/${value}`;
  const { data: exist } = await getData({ url });
  return !!exist;
}

function removeErrorMessages(input, errorElement) {
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
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
