import { useQuery } from 'react-query';
import { getAllNews } from './new.api';

export const getAllPostQuery = ({ params }) => {
  const queryKey = params ? ['getAllPostQuery', params] : ['getAllPostQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllNews(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
