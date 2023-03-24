import React from 'react';
import gundamImg from '../../images/Rx78-Babatos.jpg';

export default function Ads(props: { x: number; y: number }) {
  const { x, y } = props;

  return (
    <div>
      <img src={gundamImg} alt='gundam' style={{ width: '80rem', height: 'auto' }} />
      <div>
        <p>x: {x}</p>
        <p>y: {y}</p>
      </div>
    </div>
  );
}
