import React, { ForwardedRef, useEffect, useRef, useState } from 'react';
import styles from './title.module.scss';

interface TitleProps {
  info: {
    name: string;
  };
  logSomething: (value: any) => void;
}

function Title(props: TitleProps) {
  const { info } = props;

  const [color, setColor] = useState<string | undefined>();

  const h1Ref = useRef<HTMLHeadingElement | null>(null);

  const changeColorH1 = () => {
    if (!h1Ref.current) return;
    //Cập nhật style trực tiếp bằng DOM thật
    h1Ref.current.style.color = 'red';

    //Cập nhật style thông qua DOM ảo
    // setColor('red');
  };

  return <SubTitle ref={h1Ref} changeColorH1={changeColorH1} />;
}

// function equal(prevProps: TitleProps, nextProps: TitleProps) {
//   return prevProps.info.name === nextProps.info.name;
// }

export default React.memo(Title);

interface SubTitleProps {
  changeColorH1: () => void;
}

const SubTitle = React.forwardRef((props: SubTitleProps, ref: ForwardedRef<HTMLHeadingElement>) => {
  const { changeColorH1 } = props;

  useEffect(() => {
    console.log(ref);
  }, [ref]);

  return (
    <h1 className={styles.title} ref={ref} onClick={changeColorH1}>
      Todo list
    </h1>
  );
});
