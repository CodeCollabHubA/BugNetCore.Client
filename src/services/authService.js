import { redirect } from 'react-router-dom';
import toast from 'react-hot-toast';

import { jwtDecode } from 'jwt-decode';

import apiEndPoints from './apiEndPoints';
import http from './httpService';

const {
  logApiEndpoint,
  regApiEndpoint,
  getVerifyEmailApiEndpoint,
  requestPasswordResetApiEndpoint,
  getConfirmPasswordResetApiEndpoint,
  userApi,
} = apiEndPoints;

export async function signUp(username, email, password, confirmPassword) {
  const response = {
    validationErrors: false,
    success: false,
    errors: {},
  };
  try {
    await toast.promise(http.post(regApiEndpoint, { username, email, password, confirmPassword }), {
      loading: 'We are processing your request! please wait',
      success: 'Registeration successful, please check your email to be able to login!',
      duration: 90000,
    });
    response.success = true;
  } catch (error) {
    if (error.response.data.error.Code === 'ValidationError') {
      const { errors } = error.response.data;

      response.validationErrors = true;
      response.errors = errors;

      console.log(response);
      return response;
    }
  }

  return response;
}

export async function verifyEmail(token) {
  const verifyEmailApiEndpoint = getVerifyEmailApiEndpoint(token);
  try {
    await toast.promise(http.put(verifyEmailApiEndpoint), {
      loading: 'Verifying your email...',
      success: (res) => res.data.message,
    });
  } catch (error) {
    console.log(error);
  }
}
export async function login(email, password) {
  const response = {
    validationErrors: false,
    success: false,
    errors: {},
  };
  try {
    await toast.promise(http.post(logApiEndpoint, { email, password }), {
      loading: 'Checking your identity ...',
      success: (res) => {
        const { data: user } = res;
        const jwtToken = user.accessToken;
        storeTokenInLocalStorage(jwtToken, '');
        return `Login successful`;
      },
      duration: 3000,
    });
    response.success = true;
  } catch (error) {
    if (error.response.data.error.Code === 'ValidationError') {
      const { errors } = error.response.data;

      response.validationErrors = true;
      response.errors = errors;

      console.log(response);
      return response;
    }
  }

  return response;
}

export async function requestPasswordReset(email) {
  try {
    await toast.promise(http.post(requestPasswordResetApiEndpoint, { email }), {
      loading: 'We are processing your request! please wait',
      success: 'Password reset link sent to your email!',
      duration: 60000,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function confirmPasswordReset(token, newPassword, confirmPassword) {
  const response = {
    validationErrors: false,
    success: false,
    errors: {},
  };
  try {
    const endpoint = getConfirmPasswordResetApiEndpoint(token);
    await http.put(endpoint, { newPassword, confirmPassword });

    toast.success('Password reset successful!');
    response.success = true;
  } catch (error) {
    if (error.response.data.error.Code === 'ValidationError') {
      const { errors } = error.response.data;

      response.validationErrors = true;
      response.errors = errors;

      return response;
    }
  }

  return response;
}

export async function storeTokenInLocalStorage(jwtToken, toastMessage = 'Login successful') {
  localStorage.setItem('token', jwtToken);
  const decodedToken = jwtDecode(jwtToken);

  const expiration = decodedToken.exp;
  localStorage.setItem('expiration', expiration);

  const userId = decodedToken.nameid;

  const { data: user } = await http.get(`${userApi}/${userId}`);
  localStorage.setItem('user', JSON.stringify(user));

  localStorage.setItem('role', user.userRole);

  if (toastMessage !== '') {
    toast.success(toastMessage);
  }
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  localStorage.removeItem('expiration');
  
  localStorage.clear();
  return redirect('/auth');
}

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem('expiration');
  const expirationDate = new Date(storedExpirationDate * 1000);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem('token');

  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect('/auth');
  }

  return token;
}

export default {
  signUp,
  login,
  logout,
};
