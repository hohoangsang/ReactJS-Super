import React, { useEffect, useState } from "react";

export default function ResizeComponent() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // return () => {
    //   window.removeEventListener("resize", handleResize);
    // };
  }, []);

  return <h1>{width}</h1>;
}
