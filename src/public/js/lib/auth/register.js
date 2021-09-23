import { useRegisterFormValidation } from '../utils/auth-form.utils';
import { useActivationForm } from './activate';

export function useFormValidation() {
  useRegisterFormValidation();

  const { title } = document;
  if (!title?.includes('Registration')) useActivationForm();
}
