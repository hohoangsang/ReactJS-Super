import React, { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export default function AutoBatching() {
  const [count, setCount] = useState(1);
  const [flag, setFlag] = useState(false);
  const [count2, setCount2] = useState(10);

  const handleClick = () => {
    flushSync(() => {
      setCount((c) => c + 1);
      setCount(count + 1);
    });
    // setCount((c) => c + 1);
    // setCount(count + 1);

    setFlag((f) => !f);
    // React will only re-render once at the end (that's batching!)
  };

  console.log("count: ", count);

  return <button onClick={handleClick}>Click me</button>;
}
