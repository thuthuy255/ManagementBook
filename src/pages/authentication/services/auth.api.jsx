import { axiosClientNoAuth } from 'services/axiosConfig';

export const Login = (body) => {
  const url = `/auth/login`;
  return axiosClientNoAuth.post(url, body);
};

export const RegisterApi = (body) => {
  const url = `/auth/register`;
  return axiosClientNoAuth.post(url, body);
};

export const VerifyEmail = (body) => {
  const url = `/auth/verify`;
  return axiosClientNoAuth.post(url, body);
};

export const ResendEmail = (body) => {
  const url = `/auth/resend`;
  return axiosClientNoAuth.post(url, body);
};

export const ForgotPassword = (body) => {
  const url = `/auth/forgot-password`;
  return axiosClientNoAuth.post(url, body);
};

export const VerifyForgotPassword = (body) => {
  const url = `/auth/verify-forgot-password`;
  return axiosClientNoAuth.post(url, body);
};
