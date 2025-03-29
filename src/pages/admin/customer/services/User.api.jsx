import { axiosClient, axiosClientFile } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const GetAllUser = (params) => {
  const query = stringtifyQuery(params);
  const url = `/user/info?${query}`;
  return axiosClient.get(url);
};

export const CreateStaff = (body) => {
  const url = `/user/info`;
  return axiosClient.post(url, body);
};

export const getDetailUser = (params) => {
  const query = stringtifyQuery(params);
  const url = `/user/current?${query}`;
  return axiosClient.get(url);
};

export const updateStaff = (body) => {
  const url = `/admin/update`;
  return axiosClientFile.post(url, body);
};

export const blockUser = (params, body) => {
  const query = stringtifyQuery(params);
  const url = `admin/block?${query}`;
  return axiosClient.post(url, body);
};
