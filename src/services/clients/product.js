import { axiosClient, axiosClientNoAuth } from 'services/axiosConfig';

export const getProducts = (payload) => {
  const url = `/product`;
  return axiosClientNoAuth.get(url, {
    params: payload ? payload : {}
  });
};

export const getCategory = (payload) => {
  const url = `/category`;
  return axiosClientNoAuth.get(url, {
    params: payload ? payload : {}
  });
};

export const addCategory = (payload = {}) => {
  const url = `/order/add`;
  return axiosClient.post(url, payload);
};

export const discountAdd = (payload) => {
  const url = '/order/discount';
  return axiosClient.post(url, payload);
};

export const updateCart = (body) => {
  const url = '/order/decrease';
  return axiosClient.post(url, body);
};

export const vnPay = (body) => {
  const url = '/order/vnpay';
  return axiosClient.post(url, body);
};
// export const addCategory = (payload = {}) => {
//     const url = `/order/add`;
//     return axiosClient.post(url, payload);
// };
