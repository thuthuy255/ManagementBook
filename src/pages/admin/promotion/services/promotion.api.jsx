import { axiosClient } from 'services/axiosConfig';

export const createDiscount = (body) => {
  const url = `/discount/create`;
  return axiosClient.post(url, body);
};

export const getAllDiscount = () => {
  const url = `/discount`;
  return axiosClient.get(url);
};
export const updateDiscount = (body) => {
  const url = `/discount/update`;
  return axiosClient.post(url, body);
};
export const deleteDiscount = (body) => {
  const url = `/discount/delete`;
  return axiosClient.delete(url, { data: body });
};
