import { axiosClientNoAuth } from 'services/axiosConfig';

export const getProducts = (payload) => {
    const url = `/product`;
    return axiosClientNoAuth.get(url, {
        params: payload ? payload : {}
    });
};
export const getCategory = (payload) => {
    const url = `/category`;
    return axiosClientNoAuth.get(url, {
        params: payload ? payload : {}
    });
};