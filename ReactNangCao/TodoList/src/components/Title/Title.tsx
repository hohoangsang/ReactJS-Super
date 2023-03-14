import React from 'react';
import styles from './title.module.scss';

interface TitleProps {
  info: {
    name: string;
  };
  logSomething: (value: any) => void;
}

function Title(props: TitleProps) {
  const { info } = props;

  console.log('Title re-render');

  return <h1 className={styles.title}>Todo list</h1>;
}

// function equal(prevProps: TitleProps, nextProps: TitleProps) {
//   return prevProps.info.name === nextProps.info.name;
// }

export default React.memo(Title);
