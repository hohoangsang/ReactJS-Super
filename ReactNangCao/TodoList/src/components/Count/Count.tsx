import React, { useEffect, useLayoutEffect, useState } from 'react';

const handleHeavyTask = () => {
  const result = [];

  for (let i = 0; i <= 10000; i++) {
    const newResult = result.unshift({
      name: 'Sang',
      age: 24
    });
  }
};

export default function Count() {
  const [count, setCount] = useState<number>(0);

  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };

  // useEffect(() => {
  //   console.log('useEffect');
  // }, []);

  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect');
  // }, []);

  // console.log('render');

  useEffect(() => {
    if (count === 4) {
      handleHeavyTask();
      setCount(0);
    }
  }, [count]);

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={handleIncrease}>Increase Count</button>
    </div>
  );
}
