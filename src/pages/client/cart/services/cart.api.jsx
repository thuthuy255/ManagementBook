import { axiosClient } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getListCart = () => {
  const url = `order/cart`;
  return axiosClient.get(url);
};

export const clearListCart = () => {
  const url = `order/clear`;
  return axiosClient.post(url);
};
