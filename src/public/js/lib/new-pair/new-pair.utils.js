export class ActionButton {
  static actionBtn = document.querySelector('.action-btn');
  static #instance = null;
  text = '';

  constructor(params = { action: () => {}, text: 'Continue', show: false }) {
    if (!ActionButton.#instance) {
      ActionButton.#instance = this;
      this.lastBtnAction = params.action;
      this.text = params.text;
    }
    this.updateButton(this.lastBtnAction, this.text, params.error, params.show);
    return ActionButton.#instance;
  }

  lastBtnAction = () => {
    displayError('Please make sure everything is done correctly.');
  };

  hideActionBtn = () => ActionButton.actionBtn.classList.add('hidden');
  showActionBtn = () => ActionButton.actionBtn.classList.remove('hidden');
  #showHideBtn = (show = false) => {
    if (show) this.showActionBtn();
    else this.hideActionBtn();
  };

  setText = (text) => {
    ActionButton.actionBtn.innerText = text;
  };

  makeErrorBtn = () => ActionButton.actionBtn.classList.add('action-btn-error');
  makeDefaultBtn = () =>
    ActionButton.actionBtn.classList.remove('action-btn-error');

  toggleBtnType = (error = false) => {
    if (error) this.makeErrorBtn();
    else this.makeDefaultBtn();
  };

  setAction = (callback = () => {}) => {
    ActionButton.actionBtn.removeEventListener('click', this.lastBtnAction);
    this.lastBtnAction = callback;
    ActionButton.actionBtn.addEventListener('click', callback);
  };

  updateButton = (
    callback = () => {},
    text = 'Continue',
    error = false,
    show = true,
  ) => {
    this.#showHideBtn(show);
    this.setText(text);
    this.setAction(callback);
    this.toggleBtnType(error);
  };
}

export function hideLoadSpinner(
  loadSpinner = document.querySelector('.loading__spinner'),
) {
  if (loadSpinner) loadSpinner.classList.add('hidden');
}

const rootElement = document.querySelector('.root');

export function displayMessage(
  message,
  type = 'success',
  spinerTxt = document.querySelector('.loading__text'),
) {
  if (spinerTxt) {
    handleErrorOutput(type, spinerTxt);
    spinerTxt.innerHTML = message;
    return;
  }
  // eslint-disable-next-line no-console
  console.log('Cannot display message');
}
function handleErrorOutput(type, spinerTxt) {
  if (type === 'error') {
    spinerTxt.classList.add('error-msg');
    rootElement.classList.add('root_error');
    rootElement.classList.remove('root_warning');
  } else if (type === 'warning') {
    spinerTxt.classList.add('warning-msg');
    rootElement.classList.remove('root_error');
    rootElement.classList.add('root_warning');
  } else {
    rootElement.classList.remove('root_error');
    rootElement.classList.remove('root_warning');
  }
}

export function displayError(error, type = 'error') {
  displayMessage(`${type === 'error' ? 'error' : 'warning'}: ${error}`, type);
  hideLoadSpinner();
}
