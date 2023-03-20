import { ActionType } from './actions';

export const initialAge = {
  age: 10
};

export function init(initialAgr: typeof initialAge) {
  return {
    ...initialAgr,
    age: 20
  };
}

export default function reducer(state: typeof initialAge, action: ActionType) {
  switch (action.type) {
    case 'INCREASE_AGE':
      return { ...state, age: state.age + 1 };

    case 'DECREASE_AGE':
      return { ...state, age: state.age - 1 };

    case 'INCREASE_X_AGE':
      return { ...state, age: state.age + action.payload };

    default:
      return { ...state };
  }
}

export function log() {
  return (state: typeof initialAge, action: ActionType) => {
    console.group('State of age');
    console.log('Previous state', state);
    const newState = reducer(state, action);
    console.log('Next state: ', newState);
    console.groupEnd();
    return reducer(state, action);
  };
}
