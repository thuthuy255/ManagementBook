import { axiosClientNoAuth } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getAllNews = (params) => {
  const query = stringtifyQuery(params);
  const url = `/articles?${query}`;
  return axiosClientNoAuth.get(url);
};
