import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';

import AuthView from 'src/sections/auth/auth-view';

// ----------------------------------------------------------------------

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const isSignup = searchParams.get('mode') === 'signup';

  return (
    <>
      <Helmet>
        {!isSignup ? <title>Login | BugNet Core 🐞</title> : <title>Register | BugNet Core 🐞</title>}
      </Helmet>

      <AuthView isSignup={isSignup} />
    </>
  );
}
