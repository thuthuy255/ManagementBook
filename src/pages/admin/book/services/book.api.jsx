import { axiosClientNoAuth } from 'services/axiosConfig';

export const ListBook = () => {
  const url = `/product`;
  return axiosClientNoAuth.get(url);
};
