import { axiosClient, axiosClientFile } from 'services/axiosConfig';

export const getAllCategory = () => {
  const url = `/category`;
  return axiosClient.get(url);
};
export const createCategory = (body) => {
  console.log(body);
  const url = `/category/create`;
  return axiosClientFile.post(url, body);
};

export const updateCategory = (body) => {
  console.log(body);
  const url = `/category/update`;
  return axiosClientFile.post(url, body);
};

export const deleteCategory = (body) => {
  const url = `/category/delete`;
  return axiosClient.post(url, body);
};
