import { useCallback, useDebugValue, useState } from 'react';
import { ContextType, ThemeColor } from '../Form';

const heavyTask = (value: ThemeColor) => {
  for (let i = 0; i < 99999; i++) {}

  return value === 'light' ? 'light mode' : 'dark mode';
};

export default function useTheme() {
  const [theme, setTheme] = useState<ContextType['theme']>({ color: 'light' });

  const onChangeTheme = useCallback((color: ThemeColor) => {
    setTheme((prev) => ({ ...prev, color }));
  }, []);

  useDebugValue(theme.color, heavyTask); //useDebugValue(value, formatFunction?)

  return {
    theme,
    onChangeTheme
  };
}
