import { axiosClient } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const GetAllArticles = (params) => {
  const query = stringtifyQuery(params);
  const url = `/articles?${query}`;
  return axiosClient.get(url);
};
export const createArticles = (body) => {
  const url = `/articles/create`;
  return axiosClientFile.post(url, body);
};

export const updateArticles = (body) => {
  const url = `/articles/update`;
  return axiosClientFile.post(url, body);
};

export const deleteArticles = (body) => {
  const url = `/articles/delete`;
  return axiosClient.delete(url, body);
};
