import { useQuery } from 'react-query';
import { GetAllArticles } from './Post.api';

export const getListPostQuery = ({ params }) => {
  const queryKey = params ? ['getListPostQuery', params] : ['getListPostQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => GetAllArticles(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
