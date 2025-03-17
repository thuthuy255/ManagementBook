import { axiosClient, axiosClientFile, axiosClientNoAuth } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const ListBook = (params) => {
  const query = stringtifyQuery(params);
  const url = `/product?${query}`;
  return axiosClientNoAuth.get(url);
};

export const CreateBook = (body) => {
  const url = `/product/add`;
  return axiosClientFile.post(url, body);
};

export const deleteBook = (body) => {
  const url = `/product/delete`;
  return axiosClient.delete(url, { data: body });
};

export const updateBook = (body) => {
  const url = `/product/update`;
  return axiosClientFile.post(url, body);
};
