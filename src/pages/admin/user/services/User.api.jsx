import { axiosClient, axiosClientFile } from 'services/axiosConfig';
import { stringtifyQuery } from 'utils/StringHelper';

export const GetAllUser = (params) => {
  const query = stringtifyQuery(params);
  const url = `/user/info?${query}`;
  return axiosClient.get(url);
};

export const CreateStaff = (body) => {
  const url = `/admin/staff`;
  return axiosClientFile.post(url, body);
};
