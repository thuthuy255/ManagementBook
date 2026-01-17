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
export const getAllOrdersAdmin = (payload) => {
  const url = `/admin/order-info`;
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

export const vnPay = (payload) => {
  const url = '/order/vnpay';
  return axiosClient.post(url, payload);
};
export const sendEmail = (payload) => {
  const url = '/admin/send-email';
  return axiosClient.post(url, payload);
};

// Rating APIs
export const getRatesByProduct = (payload) => {
  const url = '/rate/product';
  return axiosClientNoAuth.get(url, {
    params: payload ? payload : {}
  });
};

export const createRate = (payload) => {
  const url = '/rate/create';
  return axiosClient.post(url, payload);
};

// Product suggestion API
export const getSuggestProduct = (payload) => {
  const url = '/product/suggest';
  return axiosClient.get(url, {
    params: payload ? payload : {}
  });
};

// Admin dashboard stats API
export const getDashboardStats = (payload) => {
  const url = '/admin/stats';
  return axiosClient.get(url, {
    params: payload ? payload : {}
  });
};

// export const addCategory = (payload = {}) => {
//     const url = `/order/add`;
//     return axiosClient.post(url, payload);
// };
