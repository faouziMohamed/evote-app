import {
  showErrorDialog,
  showSuccessDialog,
} from '../utils/modals/index.dialog';
import { postData, removeExtraSpaces } from '../utils/utils';

class ActivationForm {
  constructor() {
    this.form = document.querySelector('#activation-form');
    this.formParent = this.form.parentElement;
    this.submitButton = document.querySelector('#btn-submit');
    this.submitButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const { error, ok } = await this.sendDataToServer();
      if (!ok) {
        showErrorDialog({
          modalTitle: 'Activation Error',
          modalText: error,
          parentEl: this.formParent,
        });
      } else {
        showSuccessDialog({
          modalTitle: 'Activation Success',
          modalText: `Your account has been activated successfully! ${ok}`,
          parentEl: this.formParent,
        });
      }
    });
  }

  async sendDataToServer() {
    const data = this.readFormData();
    const res = await postData({ url: '/api/activate/request', data });
    const { error, data: ok } = res;
    return { error, ok };
  }

  readFormData() {
    const { form } = this;
    if (!form) {
      const msgError =
        'An error occured, please contact a developer to resolve it!';
      return showErrorDialog({
        modalTitle: 'Activation Error',
        modalText: msgError,
        parentEl: this.formParent,
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
