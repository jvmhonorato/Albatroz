# Albatroz

A lightweight React toolkit for password recovery flows.

Albatroz provides ready-to-use hooks and UI components for:
- forgot password requests
- reset password forms
- password recovery email templates

It is designed to plug into applications that already expose password recovery endpoints.

## Installation

```bash
npm install albatroz
```

## Peer Requirements

Albatroz expects:
- `react >= 18`
- `react-dom >= 18`

## Quick Start

```tsx
import React from 'react';
import { ForgotPasswordScreen } from 'albatroz';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPasswordPage() {
  return (
    <>
      <ToastContainer />
      <ForgotPasswordScreen />
    </>
  );
}
```

## Exports

Albatroz exports:
- `ForgotPasswordScreen`
- `ResetPassword`
- `ForgotPasswordEmail`
- `useForgotPassword`
- `useResetPassword`

## Hooks

### `useForgotPassword()`

Returns:
- `loading: boolean`
- `submitHandler: ({ email }: { email: string }) => Promise<void>`

Behavior:
- Sends `POST /api/auth/forgot-password` with `{ email }`
- Shows success/error toasts via `react-toastify`

### `useResetPassword()`

Returns:
- `loading: boolean`
- `passwordError: string`
- `confirmPasswordError: string`
- `submit: ({ password, confirmPassword }) => Promise<void>`

Behavior:
- Reads `mail` and `signature` from URL query params
- Validates password input before request
- Sends `POST /api/auth/reset-password` with:
  - `email`
  - `signature`
  - `password`
  - `password_confirmation`

## Components

### `ForgotPasswordScreen`
Prebuilt forgot-password form integrated with `react-hook-form`.

### `ResetPassword`
Prebuilt reset-password form using `useResetPassword`.

### `ForgotPasswordEmail`
React email-friendly template component.

Props:

```ts
{
  params: {
    name: string;
    url: string;
  };
}
```

## Backend Contract

Albatroz expects your backend to provide:

1. `POST /api/auth/forgot-password`
2. `POST /api/auth/reset-password`

For best UX, return structured JSON errors with a `message` field.

## Styling

The packaged components include utility-style class names. You can:
- use them as-is if they match your stack
- copy components into your app and customize styling
- use only the hooks and build your own UI

## Development

```bash
npm run typecheck
npm test
npm run build
```

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

MIT
