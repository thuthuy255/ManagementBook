import { useQuery } from 'react-query';
import { getAllBanner } from './banner.api';

export const getAllBannerQuery = ({ params }) => {
  const queryKey = params ? ['getAllBannerQuery', params] : ['getAllBannerQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllBanner(params),
    staleTime: Infinity,
    cacheTime: Infinity,
    enabled: true
  };
  return useQuery(_options);
};

export const getDetailBannerQuery = ({ params }) => {
  const queryKey = params ? ['getDetailBannerQuery', params] : ['getDetailBannerQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllBanner(params),
    staleTime: 0,
    cacheTime: 0,
    enabled: true
  };
  return useQuery(_options);
};
