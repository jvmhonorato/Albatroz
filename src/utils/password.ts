import { ResetPasswordForm } from '../types';

export type PasswordValidationErrors = {
  passwordError: string;
  confirmPasswordError: string;
};

export const validateResetPassword = ({
  password,
  confirmPassword,
}: ResetPasswordForm): PasswordValidationErrors => {
  if (!password) {
    return {
      passwordError: 'Enter the new password',
      confirmPasswordError: '',
    };
  }

  if (password.length < 8) {
    return {
      passwordError: 'The password must have at least 8 characters',
      confirmPasswordError: '',
    };
  }

  if (!confirmPassword) {
    return {
      passwordError: '',
      confirmPasswordError: 'Please confirm your password',
    };
  }

  if (password !== confirmPassword) {
    return {
      passwordError: '',
      confirmPasswordError: 'The passwords do not correspond',
    };
  }

  return {
    passwordError: '',
    confirmPasswordError: '',
  };
};
