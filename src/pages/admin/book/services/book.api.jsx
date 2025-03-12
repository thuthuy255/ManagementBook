import { axiosClientFile, axiosClientNoAuth } from 'services/axiosConfig';

export const ListBook = () => {
  const url = `/product`;
  return axiosClientNoAuth.get(url);
};

export const CreateBook = (body) => {
  console.log('đây là ', body);
  const url = `/product/add`;
  return axiosClientFile.post(url, body);
};
