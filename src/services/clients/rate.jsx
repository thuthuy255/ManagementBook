import { axiosClient } from 'services/axiosConfig';

export const createRate = (body) => {
    const url = `/rate/create`;
    return axiosClient.post(url, body);
};

export const getRatesByProduct = (params) => {
    const url = `/rate/product`;
    return axiosClient.get(url, { params });
};
