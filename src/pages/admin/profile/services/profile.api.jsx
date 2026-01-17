import { axiosClientFile } from 'services/axiosConfig';

export const updateUser = (body) => {
  const url = `/auth/update`;
  return axiosClientFile.post(url, body);
};
