import React from 'react';
import gundamImg from '../../images/Rx78-Babatos.jpg';
import { PositionType, withMouseTracker } from './MouseTracker';

interface AdsProps extends PositionType {
  visible: boolean;
}

function Ads(props: AdsProps) {
  const { x, y } = props;
  return (
    <div>
      <img src={gundamImg} alt='gundam' style={{ width: '80rem', height: 'auto' }} />
      <h4>Mouse position</h4>
      <div>
        <p>x: {x}</p>
        <p>y: {y}</p>
      </div>
    </div>
  );
}

// export default React.memo(Ads);

export default withMouseTracker(Ads);
