import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  // const [count, setCount] = useState(5);
  const navigate = useNavigate();
  const count = useRef(5);
  const [, forceRender] = useState({});

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (count === 0) {
  //       navigate('/');
  //       clearTimeout(timeoutId);
  //     } else setCount((prev) => prev - 1);
  //   }, 1000);

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [count, navigate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (count.current === 0) {
        navigate('/', {
          state: {
            type: 'REDIRECT_FROM_NOTFOUND',
            text: 'Redirect from 404 page'
          }
        });
        clearInterval(intervalId);
      } else {
        count.current = count.current - 1;
        forceRender({});
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  return (
    <Fragment>
      <div>404 Not Found!</div>
      {/* <span>Redirect to dashboard in {count}</span> */}
      <span>Redirect to dashboard in {count.current}</span>
    </Fragment>
  );
}
