import { useQuery } from 'react-query';
import { GetAllStaff, GetAllUser, getDetailUser } from './User.api';

export const getAllUserQuery = ({ params }) => {
  const queryKey = params ? ['GetAllUser', params] : ['GetAllUser'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => GetAllUser(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};

export const getAllStaffQuery = ({ params }) => {
  const queryKey = params ? ['getAllStaffQuery', params] : ['getAllStaffQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => GetAllStaff(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};

export const getDetailUserQuery = ({ params }) => {
  const queryKey = params ? ['getDetailUser', params] : ['getDetailUser'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getDetailUser(params),
    staleTime: 0,
    cacheTime: 0,
    enabled: true
  };
  return useQuery(_options);
};
