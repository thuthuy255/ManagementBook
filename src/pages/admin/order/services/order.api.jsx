import { axiosClient } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getListOrder = (params) => {
  const query = stringtifyQuery(params);
  const url = `/admin/order-info?${query}`;
  return axiosClient.get(url);
};

export const updateOrderCompleted = (body) => {
  const url = `/admin/order-completed`;
  return axiosClient.post(url, body);
};
