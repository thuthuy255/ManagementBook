import { axiosClientFile, axiosClientNoAuth } from 'services/axiosConfig';

export const ListBook = () => {
  const url = `/product`;
  return axiosClientNoAuth.get(url);
};

export const CreateBook = (body) => {
  const url = `/product/add`;
  return axiosClientFile.post(url, body);
};

export const deleteBook = (body) => {
  console.log('đây là body', body);
  const url = `/product/delete`;
  return axiosClientFile.delete(url, { data: body });
};
