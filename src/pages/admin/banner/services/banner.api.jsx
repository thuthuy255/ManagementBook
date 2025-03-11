import { axiosClient, axiosClientFile } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const getAllBanner = (params) => {
  const query = stringtifyQuery(params);
  const url = `/banner?${query}`;
  return axiosClient.get(url);
};
export const createBanner = (body) => {
  const url = `/banner/create`;
  return axiosClientFile.post(url, body);
};

export const updateBanner = (body) => {
  const url = `/banner/update`;
  return axiosClientFile.post(url, body);
};

export const deleteBanner = (body) => {
  const url = `/banner/delete`;
  return axiosClient.delete(url, body);
};
