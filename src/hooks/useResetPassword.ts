import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ResetPasswordForm } from '../types';
import { getError } from '../utils/error';
import { validateResetPassword } from '../utils/password';

const getQueryParam = (key: string): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return new URLSearchParams(window.location.search).get(key);
};

const useResetPassword = () => {
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async ({ password, confirmPassword }: ResetPasswordForm) => {
    setLoading(true);
    setPasswordError('');
    setConfirmPasswordError('');

    const errors = validateResetPassword({ password, confirmPassword });
    setPasswordError(errors.passwordError);
    setConfirmPasswordError(errors.confirmPasswordError);

    if (errors.passwordError || errors.confirmPasswordError) {
      setLoading(false);
      return;
    }

    const email = getQueryParam('mail');
    const signature = getQueryParam('signature');

    if (!email || !signature) {
      toast.error('Invalid recovery link');
      setLoading(false);
      return;
    }

    try {
      await axios.post('/api/auth/reset-password', {
        email,
        signature,
        password,
        password_confirmation: confirmPassword,
      });

      toast.success('Password reset successful', { theme: 'colored' });
    } catch (error) {
      toast.error(getError(error));
    } finally {
      setLoading(false);
    }
  };

  return { loading, passwordError, confirmPasswordError, submit };
};

export default useResetPassword;
