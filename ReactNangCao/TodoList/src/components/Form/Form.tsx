import React, { createContext, useCallback, useContext, useId, useMemo, useState } from 'react';
import styles from './form.module.scss';

type ThemeColor = 'light' | 'dark';

interface ContextType {
  theme: {
    color: ThemeColor;
  };
  onChangeTheme: (color: ThemeColor) => void;
}

const ThemeContext = createContext<ContextType>({
  theme: {
    color: 'light'
  },
  onChangeTheme: () => {}
});

export default function Form() {
  const [theme, setTheme] = useState<ContextType['theme']>({ color: 'light' });
  const [, forceRender] = useState({});

  const onChangeTheme = useCallback((color: ThemeColor) => {
    setTheme((prev) => ({ ...prev, color }));
  }, []);

  const valueContext = useMemo(() => {
    return { theme, onChangeTheme };
  }, [theme, onChangeTheme]);

  const handleRender = () => forceRender({});

  return (
    <div className='welcome'>
      <div>
        <button onClick={handleRender}>Force render</button>
      </div>
      <ThemeContext.Provider value={valueContext}>
        <FormComponent />
        <Label />
      </ThemeContext.Provider>
    </div>
  );
}

const FormComponent = React.memo(() => {
  console.log('re-render');
  return (
    <Panel title='Welcome'>
      <Button>Sign up</Button>
      <Button>Log in</Button>
    </Panel>
  );
});

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

function Panel({ title, children }: PanelProps) {
  const { theme } = useContext(ThemeContext);

  const className = 'panel-' + theme.color;
  const titleClassName = 'title-' + theme.color;
  return (
    <section className={`${styles[className]} ${styles.panel}`}>
      <h1 className={styles[titleClassName]}>{title}</h1>
      {children}
    </section>
  );
}

interface ButtonProps {
  children: React.ReactNode;
}

function Button({ children }: ButtonProps) {
  const { theme } = useContext(ThemeContext);

  const className = 'button-' + theme.color;
  return <button className={`${styles[className]} ${styles.button}`}>{children}</button>;
}

const Label = () => {
  const { theme, onChangeTheme } = useContext(ThemeContext);
  const id = useId();
  return (
    <div>
      <input
        type='checkbox'
        checked={theme.color === 'dark'}
        onChange={(e) => onChangeTheme(e.target.checked ? 'dark' : 'light')}
        id={id}
      />
      <label htmlFor={id}>Toggle dark mode</label>
    </div>
  );
};
