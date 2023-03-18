import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

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
  // const [count, setCount] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);

  // const handleIncrease = () => {
  //   setCount((prev) => prev + 1);
  // };

  // useEffect(() => {
  //   console.log('useEffect');
  // }, []);

  // useLayoutEffect(() => {
  //   console.log('useLayoutEffect');
  // }, []);

  // console.log('render');

  // useLayoutEffect(() => {
  //   if (count === 4) {
  //     setCount(0);
  //     alert(`Count: ${count}`);
  //   }
  // }, [count]);

  useLayoutEffect(() => {
    const handleSetWidth = () => {
      setWidth(sectionRef.current?.offsetWidth || 0);
    };

    handleSetWidth();

    window.addEventListener('resize', handleSetWidth);

    return () => {
      window.removeEventListener('resize', handleSetWidth);
    };
  }, []);

  return (
    <div>
      {/* <h3>Count: {count}</h3>
      <button onClick={handleIncrease}>Increase Count</button> */}

      <section ref={sectionRef} style={{ backgroundColor: 'red' }}>
        Main content
      </section>

      {width && width <= 400 ? (
        <div style={{ backgroundColor: 'yellow' }}>Content show when width in less than 300px</div>
      ) : null}
    </div>
  );
}
