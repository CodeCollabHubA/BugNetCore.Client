import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { bgGradient } from 'src/theme/css';

import { RouterLink } from 'src/routes/components';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { login, storeTokenInLocalStorage, getAuthToken, signUp } from 'src/services/authService';
import apiEndPoints from 'src/services/apiEndPoints';
// ----------------------------------------------------------------------

const { getGitHubOAuthEndpoint } = apiEndPoints;
export default function AuthView({ isSignup }) {
  const gitHubOAuthEndpoint = getGitHubOAuthEndpoint(window.location.href);
  const theme = useTheme();

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    const checkToken = () => {
      const token = getAuthToken();
      if (token) {
        router.push('/');
      }
      
      // Get all cookies
      const cookies = document.cookie.split('; ');

      // Check if the specific cookie exists
      const tokenCookie = cookies.find((cookie) => cookie.startsWith('github_jwt_token='));

      if (tokenCookie) {
        const tokenValue = tokenCookie.split('=')[1];
        storeTokenInLocalStorage(tokenValue);
        router.push('/');
      }
    };

    checkToken();
  }, [router]); // Empty dependency array means this runs once when the component mounts

  const handleClick = async () => {
    setValidationErrors({});
    let res = {};
    if (isSignup) {
      res = await signUp(username, email, password, confirmPassword);
    } else {
      res = await login(email, password);
    }

    if (res.success && !isSignup) {
      router.push('/');
    } else if (res.validationErrors) {
      setValidationErrors(res.errors);
    }
  };

  const renderForm = (
    <>
      <Stack spacing={3}>
        {isSignup && (
          <TextField
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
          />
        )}

        <TextField
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
        />

        <TextField
          name="password"
          label="Password"
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

        {isSignup && (
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

      {isSignup ? (
        <br />
      ) : (
        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 3 }}>
          <Link component={RouterLink} href="reset-password" variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>
      )}

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        {isSignup ? 'Sign Up' : 'Login'}
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
          <Typography variant="h4">
            {isSignup ? 'Sign Up' : 'Sign In'} to BugNet Core 🐞{' '}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2, mb: 5 }}>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}

            <Link
              component={RouterLink}
              href={isSignup ? '/auth' : '/auth?mode=signup'}
              variant="subtitle2"
              sx={{ ml: 0.5 }}
            >
              {isSignup ? 'Sign In' : 'Get started'}
            </Link>
          </Typography>

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16) }}
              href={gitHubOAuthEndpoint}
            >
              <Iconify icon="eva:github-fill" color="#161614" width={28} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

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

AuthView.propTypes = {
  isSignup: PropTypes.bool.isRequired,
};
