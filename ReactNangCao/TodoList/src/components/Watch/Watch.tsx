import { useEffect, useRef, useState } from 'react';

function WatchTimer() {
  const [timer, setTimer] = useState<number>(0);

  const intervalRef = useRef<any>(null);

  useEffect(() => {
    console.log('Watch timer run');
    intervalRef.current = setInterval(() => {
      setTimer((prev) => prev + 1);
      console.log('SetInterval dang chay');
    }, 1000);

    return () => {
      console.log('Watch timer unmount!');
      clearInterval(intervalRef.current);
    };
  }, [intervalRef]);
  return <h3>Timer: {timer}</h3>;
}

export default function Watch() {
  const [visible, setVisible] = useState<boolean>(false);
  return (
    <div>
      <button onClick={() => setVisible((prev) => !prev)}>Toggle Watch</button>
      {visible && <WatchTimer />}
    </div>
  );
}
