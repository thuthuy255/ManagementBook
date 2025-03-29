import { useQuery } from 'react-query';
import { getListOrder } from './order.api';

export const getAllListOrder = ({ params }) => {
  const queryKey = params ? ['getAllListOrder', params] : ['getAllListOrder'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getListOrder(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
