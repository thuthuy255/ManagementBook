import { axiosClient } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getListOrderClient = (params) => {
  const query = stringtifyQuery(params);
  const url = `/user/order-info?${query}`;
  return axiosClient.get(url);
};
