import { useQuery } from 'react-query';
import { getListCart } from './cart.api';

export const getListCartQuery = () => {
  const queryKey = ['getListCartQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getListCart(),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
