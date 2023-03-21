import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

export default function AutoInput() {
  const autoInputRef = useRef<{ autoTyping: () => void }>({ autoTyping: () => {} });

  const handleAutoTyping = () => {
    autoInputRef.current?.autoTyping();
  };

  return (
    <div>
      <button onClick={handleAutoTyping}>Click for auto typing</button>
      <br />
      <Input ref={autoInputRef} />
    </div>
  );
}

const Input = React.forwardRef(function Input(prop: any, ref: any) {
  const [input, setInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const autoTyping = () => {
    const name = 'Ho Hoang Sang';
    let index = 1;
    inputRef.current?.focus();
    const intervalId: any = setInterval(() => {
      setInput(name.slice(0, index));
      if (index === name.length) {
        return clearInterval(intervalId);
      }
      index++;
    }, 100);
  };

  useImperativeHandle(
    ref,
    () => {
      return {
        autoTyping
      };
    },
    []
  );

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <input type='text' value={input} onChange={handleChangeInput} placeholder={'type something...'} ref={inputRef} />
  );
});
