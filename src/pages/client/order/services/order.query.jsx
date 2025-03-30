import { useQuery } from 'react-query';
import { getListOrderClient } from './order.api';

export const getAllListOrderClient = ({ params }) => {
  const queryKey = params ? ['getListOrderClient', params] : ['getListOrderClient'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getListOrderClient(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
