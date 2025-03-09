import { axiosClient } from 'services/axiosConfig';
import { stringifyQuery } from 'utils/StringHelper';

export const GetAllUser = (params) => {
  const query = stringifyQuery(params);
  const url = `/user/info?${query}`;
  return axiosClient.get(url);
};

// export const GetAllUser = (params) => {
//   const query = stringifyQuery(params);
//   const url = `/user/current?`;
//   return axiosClient.get(url);
// };
