import { useQuery } from 'react-query';
import { ListBook } from './book.api';

export const getAllBookQuery = ({ params }) => {
  const queryKey = params ? ['getAllBookQuery', params] : ['getAllBookQuery'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => ListBook(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
