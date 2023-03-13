import React from 'react';
import { debug, log } from '../constants';

export interface ExtraType {
  debug: boolean;
  log: (value: any) => void;
}

export interface InfoUser {
  name: string;
  age: number;
}

export function connect<T>(Component: React.ComponentType<T & ExtraType>) {
  return function (props: Omit<T, keyof ExtraType>) {
    return <Component {...(props as T)} debug={debug} log={log} />;
  };
}

export function connect2<K>(injectedProps: K) {
  return function <T>(Component: React.ComponentType<T & K>) {
    return function (props: Omit<T, keyof K>) {
      return <Component {...(props as T & {})} {...injectedProps} />;
    };
  };
}
