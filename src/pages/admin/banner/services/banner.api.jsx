import { axiosClient } from 'services/axiosConfig';

export const getAllBanner = () => {
  const url = `/banner`;
  return axiosClient.get(url);
};
