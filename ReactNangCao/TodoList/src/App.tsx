import Count from './components/Count';
import Counter from './components/Counter';
import Slider from './components/Slider';
import TodoList from './TodoListApp/TodoList';
import Watch from './components/Watch';
import Form from './components/Form';
import AutoInput from './components/AutoInput';
import Student from './components/Student';
import MouseTracker from './components/MouseTracker';
import Ads from './components/MouseTracker/Ads';
import { useCallback, useMemo, useRef, useState } from 'react';
import { PositionType } from './components/MouseTracker/MouseTracker';

function App() {
  const [, forceRender] = useState<any>({});

  // const renderRef = useRef<(value: PositionType) => React.ReactElement>((value: PositionType) => <Ads {...value} />);

  // const renderAds = useCallback((value: PositionType) => <Ads {...value} />, []);

  // const renderAds = useMemo(() => {
  //   return (value: PositionType) => <Ads {...value} />;
  // }, []);

  return (
    <div>
      {/* <TodoList /> */}
      {/* <Watch /> */}
      {/* <Slider /> */}
      {/* <Count /> */}
      {/* <Counter /> */}
      {/* <Form /> */}
      {/* <AutoInput /> */}
      {/* <Student /> */}
      {/* <button onClick={() => forceRender({})}>Force render</button>
      <MouseTracker children={renderRef.current} /> */}
      <Ads visible={true} />
    </div>
  );
}

export default App;
