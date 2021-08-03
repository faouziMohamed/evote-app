const uncheckInputAndDisableButton = (input, button) => {
  // eslint-disable-next-line no-param-reassign
  input.checked = false;
  button.classList.remove('enabled');
};

const disableOtherInputsAndButtons = (inputs, input, buttons) => {
  inputs.forEach((x, index) => {
    if (x !== input) {
      uncheckInputAndDisableButton(x, buttons[index]);
    }
  });
};

export const handleUserVote = () => {
  const buttons = document.querySelectorAll('.vote-btn');
  if (!buttons) return;

  const inputs = document.querySelectorAll('.vote-checkbox');
  inputs.forEach((input, index) => {
    uncheckInputAndDisableButton(input, buttons[index]);
    input.addEventListener('change', () => {
      buttons[index].classList.toggle('enabled');
      if (input.checked) {
        disableOtherInputsAndButtons(inputs, input, buttons);
      }
    });
  });
};
