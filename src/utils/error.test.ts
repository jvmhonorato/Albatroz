import type { AxiosError } from 'axios';
import { getError } from './error';

describe('getError', () => {
  it('returns API error message for axios errors with a response payload', () => {
    const error = {
      isAxiosError: true,
      message: 'Request failed',
      response: {
        data: {
          message: 'Invalid token',
        },
      },
    } as unknown as AxiosError<{ message: string }>;

    expect(getError(error)).toBe('Invalid token');
  });

  it('returns generic error message for unknown values', () => {
    expect(getError('unexpected')).toBe('An unexpected error occurred');
  });
});
