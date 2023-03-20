import { useReducer } from 'react';
import { decreaseAgeAction, increaseAgeAction, increaseXAgeAction } from '../../reducer/actions';
import reducer, { init, initialAge, log } from '../../reducer/reducer';

const x = 4;

export default function Counter() {
  const [state, dispatch] = useReducer(log(), initialAge, init);

  const increaseAge = () => {
    dispatch(increaseAgeAction());
  };

  const decreaseAge = () => {
    dispatch(decreaseAgeAction());
  };

  const increaseXAge = () => {
    dispatch(increaseXAgeAction(x));
  };

  return (
    <div>
      <button onClick={increaseAge} style={{ color: 'red' }}>
        Increase age
      </button>
      <h3>Age: {state.age}</h3>
      <button onClick={decreaseAge} style={{ color: 'blue' }}>
        Decrease age
      </button>
      <br />
      <button onClick={increaseXAge} style={{ color: 'green' }}>
        Increase {x} age
      </button>
    </div>
  );
}
