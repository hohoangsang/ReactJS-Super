import React, { useState } from 'react';
import Ads from './Ads';

interface PositionType {
  x: number;
  y: number;
}

export default function MouseTracker({ children }: { children: (potition: PositionType) => JSX.Element }) {
  const [, forceUpdate] = useState({});

  const [position, setPotition] = useState<PositionType>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPotition({
      x: e.clientX,
      y: e.clientY
    });
  };

  return (
    <div>
      <button onClick={() => forceUpdate({})}>Click ro Re-render</button>
      <h3 style={{ color: 'red' }}>MouseTracker</h3>
      <div onMouseMove={handleMouseMove}>{children(position)}</div>
    </div>
  );
}
