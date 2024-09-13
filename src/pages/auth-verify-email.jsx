import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Box, CircularProgress } from '@mui/material';
import { verifyEmail } from 'src/services/authService';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const confirmToken = searchParams.get('token');

  if (!confirmToken) {
    navigate('/auth', { replace: true });
  }

  useEffect(() => {
    const verify = async () => {
      try {
        await verifyEmail(confirmToken);
      } catch (error) {
        console.error('Error verifying email:', error);
      }
      setTimeout(() => {
        navigate('/auth', { replace: true });
      }, 1000);
    };

    verify();
  });

  return (
    <>
      <Helmet>
        <title>Verify Email | BugNet Core 🐞</title>
      </Helmet>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}
