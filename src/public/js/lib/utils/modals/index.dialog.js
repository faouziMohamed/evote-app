import { AlertDialog } from './alerte-dialog';

export function showDialog({
  modalType = 'success',
  modalTitle = 'Success',
  modalOkBtnText = 'Done',
  modalText = 'Success',
  parentEl = document.body,
  forceNewParent = false,
  btnEventCallback = null,
}) {
  const options = {
    modalType,
    modalTitle,
    modalOkBtnText,
    modalText,
  };
  const dialog = new AlertDialog({ ...options });
  const dialogParent = dialog.getDialogWithParent();
  dialog.attachEventsTo('btnOk', 'click', () => {
    dialogParent.remove(dialogParent);
    if (btnEventCallback) {
      btnEventCallback();
    }
  });
  const mainContent = document.querySelector('.main-content');
  if (forceNewParent) {
    parentEl.append(dialogParent);
  } else {
    const elParent = mainContent || parentEl;
    elParent.append(dialogParent);
  }
  dialogParent.querySelector('button')?.focus();
}

export function showSuccessDialog({
  modalText,
  modalOkBtnText = 'Close',
  modalTitle = 'User added',
  parentEl = document.body,
  btnEventCallback = null,
}) {
  showDialog({
    modalType: 'success',
    modalOkBtnText,
    modalTitle,
    modalText,
    parentEl,
    btnEventCallback,
  });
}

export function showErrorDialog({
  modalTitle = 'Error',
  modalOkBtnText = 'Ok',
  modalText = 'An error occured, please retry!',
  parentEl = document.body,
  btnEventCallback = null,
}) {
  showDialog({
    modalType: 'error',
    modalTitle,
    modalOkBtnText,
    modalText,
    parentEl,
    btnEventCallback,
  });
}
