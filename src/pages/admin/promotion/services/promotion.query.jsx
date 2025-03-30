import { useQuery } from 'react-query';
import { getAllDiscount } from './promotion.api';

export const getAllDiscountQuery = ({ params }) => {
  const queryKey = params ? ['getAllDiscount', params] : ['getAllDiscount'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllDiscount(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
