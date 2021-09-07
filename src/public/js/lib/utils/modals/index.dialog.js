import { AlertDialog } from './alerte-dialog';

export function showDialog({
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
  dialog.attachEventsTo('btnOk', 'click', () => {
    dialogParent.remove(dialogParent);
  });
  document.querySelector('.main-content')?.append(dialogParent);
  dialogParent.querySelector('button')?.focus();
}

export function showSuccessDialog({
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

export function showErrorDialog({
  modalTitle = 'Error',
  modalOkBtnText = 'Ok',
  modalText = 'An error occured, please retry!',
}) {
  showDialog({ modalType: 'error', modalTitle, modalOkBtnText, modalText });
}
