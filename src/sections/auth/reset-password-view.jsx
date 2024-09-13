import { useState } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { requestPasswordReset, confirmPasswordReset } from 'src/services/authService';
// ----------------------------------------------------------------------

export default function ResetPasswordView({ confirmToken }) {
  const theme = useTheme();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleClick = async () => {
    if (confirmToken) {
      setValidationErrors({});
      const res = await confirmPasswordReset(confirmToken, password, confirmPassword);
      if (res.success) {
        router.push('/auth');
      }
      if (res.validationErrors) {
        setValidationErrors(res.errors);
      }
    } else {
      await requestPasswordReset(email);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {!confirmToken && (
          <TextField
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
          />
        )}

        {confirmToken && (
          <TextField
            name="password"
            label="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        {confirmToken && (
          <TextField
            name="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
        sx={{ mt: 4 }}
      >
        {confirmToken ? 'Submit' : 'Send a request'}
      </LoadingButton>
    </>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        sx={{ height: 1 }}
      >
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {confirmToken ? 'Confirm' : 'Request'} Password Reset{' '}
          </Typography>
          {renderForm}
          {Object.keys(validationErrors).length > 0 && (
            <Stack
              direction="column"
              alignItems={{ xs: 'flex-start', md: 'center' }}
              justifyContent="flex-end"
              sx={{ mt: 2 }}
            >
              {Object.entries(validationErrors).map(([field, errors]) => {
                const reversedErrors = [...errors].reverse();
                return (
                  <Typography key={field} variant="body2" color="error.main">
                    {reversedErrors.map((error, index) => (
                      <span key={index}>
                        {error}
                        <br />
                      </span>
                    ))}
                    <br />
                  </Typography>
                );
              })}
            </Stack>
          )}
        </Card>
      </Stack>
    </Box>
  );
}

ResetPasswordView.propTypes = {
  confirmToken: PropTypes.string,
};
