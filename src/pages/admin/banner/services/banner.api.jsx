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

export const updateBanner = async (body) => {
  const url = `/banner/update`;
  try {
    const response = await axiosClientFile.post(url, body);
    console.log("API updateBanner response:", response);
    return response;
  } catch (error) {
    console.error("Lỗi khi gọi API updateBanner:", error.response ? error.response.data : error);
    throw error;
  }
};


export const deleteBanner = (body) => {
  const url = `/banner/delete`;
  return axiosClient.delete(url, body);
};
