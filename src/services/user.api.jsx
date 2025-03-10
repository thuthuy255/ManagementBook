import { axiosClient } from 'services/axiosConfig';

export const GetInfoUser = () => {
  const url = `/user/current`;
  return axiosClient.get(url);
};
