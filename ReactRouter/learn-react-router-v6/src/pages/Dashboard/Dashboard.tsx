import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import queryString from 'query-string';

export default function Dashboard() {
  const location = useLocation();

  console.log('search params: ', queryString.parse(location.search));

  // const [params] = useSearchParams();

  // console.log('Search ', Object.fromEntries([...params]));
  useEffect(() => {
    if (location.pathname === '/') document.title = 'React App - dashboard';

    return () => {
      document.title = 'React App';
    };
  }, [location]);

  return (
    <div>
      <h1 className='mb-6 text-lg'>Dashboard</h1>
      {location.state?.text && <span>{location.state?.text}</span>}
    </div>
  );
}
