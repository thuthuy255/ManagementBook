import { axiosClient } from 'services/axiosConfig';

export const getListOrder = () => {
  const url = `/admin/order-info`;
  return axiosClient.get(url);
};

export const updateOrderCompleted = (body) => {
  const url = `/admin/order-completed`;
  return axiosClient.post(url, body);
};
