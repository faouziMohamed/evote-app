import {
  showErrorDialog,
  showSuccessDialog,
} from '../utils/modals/index.dialog';
import { postData, redirectTo, removeExtraSpaces } from '../utils/utils';

class ActivationForm {
  constructor() {
    this.form = document.querySelector('#activation-form');
    this.dialogParent = document.querySelector('.right-side');
    this.submitButton = document.querySelector('#btn-submit');
    this.spinner = this.dialogParent?.querySelector('.spinner_preloader');
    this.spinner.classList.add('hidden');

    this.submitButton?.addEventListener('click', async (e) =>
      this.attachEventToSubmitBtn(e),
    );
  }

  async attachEventToSubmitBtn(e) {
    e.preventDefault();
    this.spinner.classList.remove('hidden');
    const { error, ok, rdr } = await this.sendDataToServer();
    this.spinner.classList.add('hidden');

    if (!ok) {
      showErrorDialog({
        modalTitle: 'Activation Error',
        modalText: error,
        parentEl: this.dialogParent,
        btnEventCallback: rdr ? () => redirectTo(rdr) : null,
      });
    } else {
      showSuccessDialog({
        modalTitle: 'Activation link sent',
        modalText: ok,
        parentEl: this.dialogParent,
        btnEventCallback: () => redirectTo('/'),
      });
    }
  }

  async sendDataToServer() {
    const data = this.readFormData();
    const res = await postData({ url: '/api/activate/request', data });
    const { error, data: ok, redirectTo: rdr } = res;
    return { error, ok, rdr };
  }

  readFormData() {
    const { form } = this;
    if (!form) {
      const msgError =
        'An error occured, please contact a developer to resolve it!';
      return showErrorDialog({
        modalTitle: 'Activation Error',
        modalText: msgError,
        parentEl: this.dialogParent,
      });
    }
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = removeExtraSpaces(value);
    });
    return data;
  }
}

export async function useActivationForm() {
  return new ActivationForm();
}
