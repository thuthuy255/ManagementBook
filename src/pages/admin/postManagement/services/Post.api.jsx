import { axiosClient, axiosClientFile } from 'services/axiosConfig';
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
  console.log('body', body);
  const url = `/articles/delete`;
  return axiosClient.delete(url, { data: body });
};
