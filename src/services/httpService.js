import { toast } from 'react-hot-toast';
import axios from 'axios';

axios.defaults.headers.common['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    const localstorage = localStorage.getItem('user');
    const token = localstorage ? JSON.parse(localstorage).accessToken : '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.status >= 400 && error.status < 501;
  if (expectedError) {
    const errorMessage = error.response.data.error.message;
    toast.error(errorMessage);
  } else {
    toast.error('An unexpected error occurred, please try again later');
  }
  return Promise.reject(error);
});

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
