import { useSearchParams } from 'react-router-dom';

export const useQueryString = () => {
  const [searchParams] = useSearchParams();

  const queryString = Object.fromEntries([...searchParams]);

  return queryString;
};
