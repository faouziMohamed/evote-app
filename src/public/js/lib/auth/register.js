import { useRegisterFormValidation } from '../utils/auth-form.utils';
import { useActivationForm } from './activate';

export function useFormValidation() {
  try {
    useRegisterFormValidation();

    const { title } = document;
    if (!title?.includes('Registration')) useActivationForm();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message);
  }
}
