import { axiosClient } from 'services/axiosConfig';
import { stringifyQuery } from 'utils/StringHelper';

export const GetAllArticles = (params) => {
  const query = stringifyQuery(params);
  const url = `/articles?${query}`;
  return axiosClient.get(url);
};
