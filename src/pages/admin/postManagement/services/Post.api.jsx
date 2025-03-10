import { axiosClient } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const GetAllArticles = (params) => {
  const query = stringtifyQuery(params);
  const url = `/articles?${query}`;
  return axiosClient.get(url);
};
