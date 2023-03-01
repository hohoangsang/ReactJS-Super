// import React, { useEffect, useState } from "react";

// export default function Timer() {
//   const [countDown, setCountDown] = useState(200);

//   useEffect(() => {
//     const timerId = setInterval(() => {
//       setCountDown((prevState) => prevState - 1);
//       console.log("Count dowm...");
//     }, 1000);

//     return () => {
//       clearInterval(timerId);
//     };
//   }, []);

//   return <h1>{countDown}</h1>;
// }

import React, { useEffect, useState } from "react";

export default function Timer() {
  const [count, setCount] = useState(0);

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    console.log("current count", count);

    return () => {
      console.log("clean up count: ", count);
    };
  }, [count]);

  return (
    <>
      <h1>{count}</h1>
      <button onClick={handleIncrease}>Increase</button>
    </>
  );
}
