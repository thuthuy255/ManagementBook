import { useQuery } from 'react-query';
import { GetAllUser } from './user.api';

export const getAllUserQuery = ({ params }) => {
  const queryKey = params ? ['GetAllUser', params] : ['GetAllUser'];
  const _options = {
    queryKey: queryKey,
    queryFn: () => GetAllUser(params),
    staleTime: 3 * 60 * 1000,
    cacheTime: 3 * 60 * 1000,
    enabled: true
  };
  return useQuery(_options);
};
