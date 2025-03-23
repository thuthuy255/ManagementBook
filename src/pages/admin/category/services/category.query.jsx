import { useQuery } from 'react-query';
import { getAllCategory } from './category.api';

export const getAllCategoryQuery = ({ params }) => {
  const queryKey = params ? ['getAllCategory', params] : ['getAllCategory'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllCategory(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
