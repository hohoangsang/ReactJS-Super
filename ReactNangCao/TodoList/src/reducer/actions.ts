export type IncreaseAgeType = {
  type: 'INCREASE_AGE';
};

export type DecreaseAgeType = {
  type: 'DECREASE_AGE';
};

export type IncreaseXAge = {
  type: 'INCREASE_X_AGE';
  payload: number;
};

export type ActionType = IncreaseAgeType | DecreaseAgeType | IncreaseXAge;

export function increaseAgeAction() {
  return { type: 'INCREASE_AGE' } as { type: 'INCREASE_AGE' };
}

export function decreaseAgeAction() {
  return { type: 'DECREASE_AGE' } as { type: 'DECREASE_AGE' };
}

export function increaseXAgeAction(x: number) {
  return { type: 'INCREASE_X_AGE', payload: x } as { type: 'INCREASE_X_AGE'; payload: number };
}
