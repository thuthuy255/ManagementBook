import { axiosClientFile } from 'services/axiosConfig';

export const updateUser = (body) => {
  const url = `/admin/update`;
  return axiosClientFile.post(url, body);
};
