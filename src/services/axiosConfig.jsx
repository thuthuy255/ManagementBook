import axios from 'axios';
import store from '../features/store';
import { resetLogin } from '../features/slices/app.slice';
import { APP_URL } from 'constants/Url';

const handleRequest = (config) => {
  //check token

  const storeState = store.getState();
  const access_token = storeState.app.token || localStorage.getItem('access_token');
  if (access_token && config.headers) {
    config.headers['Authorization'] = 'Bearer ' + access_token;
  }
  config.validateStatus = function (status) {
    return status >= 200 && status < 300; // default
  };
  return config;
};

const handleRequestError = (error) => {
  return Promise.reject(error);
};

const handleResponse = (response) => {
  return response.data;
};

const handleResponseError = async (error) => {
  //xử lý khi token hết hạn
  console.log('error axios', error);
  if (error.response?.status === 401) {
    const dispatch = store.dispatch;
    dispatch(resetLogin());
    // Xóa token khỏi localStorage
    localStorage.removeItem('access_token');

    // window.location.href = '/';
    return;
  }

  if (error.response?.status !== 404) {
  }

  return Promise.reject(error.response?.data);
};

const axiosClientFile = axios.create({
  baseURL: APP_URL,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
});

const axiosClient = axios.create({
  baseURL: APP_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const axiosClientNoAuth = axios.create({
  baseURL: APP_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosClientNoAuth.interceptors.request.use(handleRequest, handleRequestError);
axiosClientNoAuth.interceptors.response.use(handleResponse, handleResponseError);
axiosClient.interceptors.request.use(handleRequest, handleRequestError);
axiosClient.interceptors.response.use(handleResponse, handleResponseError);
axiosClientFile.interceptors.request.use(handleRequest, handleRequestError);
axiosClientFile.interceptors.response.use(handleResponse, handleResponseError);

export { axiosClientFile, axiosClient, axiosClientNoAuth };
