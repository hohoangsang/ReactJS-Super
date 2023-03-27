import React, { useState } from 'react';

export interface PositionType {
  x: number;
  y: number;
}

function MouseTracker({ children }: { children: (potition: PositionType) => JSX.Element }) {
  const [position, setPotition] = useState<PositionType>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPotition({
      x: e.clientX,
      y: e.clientY
    });
  };

  console.log('Mouse tracker re-render');

  return (
    <div>
      <h3 style={{ color: 'red' }}>MouseTracker</h3>
      <div onMouseMove={handleMouseMove}>{children({ ...position })}</div>
    </div>
  );
}

export default React.memo(MouseTracker);

export function withMouseTracker<T>(Component: React.ComponentType<T & PositionType>) {
  return function (props: Omit<T, keyof PositionType>) {
    const [position, setPotition] = useState<PositionType>({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      setPotition({
        x: e.clientX,
        y: e.clientY
      });
    };

    return (
      <div>
        <h3 style={{ color: 'red' }}>MouseTracker</h3>
        <div onMouseMove={handleMouseMove}>
          <Component {...(props as T)} {...position} />
        </div>
      </div>
    );
  };
}
