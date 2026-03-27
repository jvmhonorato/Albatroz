import axios from 'axios';

const getError = (err: unknown): string => {
  if (axios.isAxiosError<{ message?: string }>(err)) {
    return err.response?.data?.message ?? err.message;
  }

  if (err instanceof Error) {
    return err.message;
  }

  return 'An unexpected error occurred';
};

export { getError };
