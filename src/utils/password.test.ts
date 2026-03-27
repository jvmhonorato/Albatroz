import { validateResetPassword } from './password';

describe('validateResetPassword', () => {
  it('returns password required error when password is missing', () => {
    expect(validateResetPassword({ password: '', confirmPassword: '' })).toEqual({
      passwordError: 'Enter the new password',
      confirmPasswordError: '',
    });
  });

  it('returns confirm password mismatch error when values differ', () => {
    expect(
      validateResetPassword({
        password: 'strong-pass',
        confirmPassword: 'different-pass',
      }),
    ).toEqual({
      passwordError: '',
      confirmPasswordError: 'The passwords do not correspond',
    });
  });

  it('returns no errors for valid passwords', () => {
    expect(
      validateResetPassword({
        password: 'strong-pass',
        confirmPassword: 'strong-pass',
      }),
    ).toEqual({
      passwordError: '',
      confirmPasswordError: '',
    });
  });
});
