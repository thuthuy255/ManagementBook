import { axiosClient, axiosClientFile } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getAllCategory = (params) => {
  const query = stringtifyQuery(params);
  const url = `/category?${query}`;
  return axiosClient.get(url);
};
export const createCategory = (body) => {
  const url = `/category/create`;
  return axiosClientFile.post(url, body);
};

export const updateCategory = (body) => {
  const url = `/category/update`;
  return axiosClientFile.post(url, body);
};

export const deleteCategory = (body) => {
  console.log('xin chào', body);
  const url = `/category/delete`;
  return axiosClient.delete(url, { data: body });
};
