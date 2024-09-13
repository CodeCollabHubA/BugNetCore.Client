import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import ResetPasswordView from 'src/sections/auth/reset-password-view';

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('token');

  return (
    <>
      <Helmet>
        {confirmToken ? (
          <title>Confirm Reset | BugNet Core 🐞</title>
        ) : (
          <title>Request Reset | BugNet Core 🐞</title>
        )}
      </Helmet>

      <ResetPasswordView confirmToken={confirmToken} />
    </>
  );
}
