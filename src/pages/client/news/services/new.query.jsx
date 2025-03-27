import { getAllNews } from 'pages/client/home/services/new.api';
import { useQuery } from 'react-query';

export const getAllNewsQuery = ({ params }) => {
  const queryKey = params ? ['getAllNewsQuery', params] : ['getAllNewsQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => getAllNews(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
