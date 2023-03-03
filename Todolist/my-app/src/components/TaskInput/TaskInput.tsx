import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './taskInput.module.scss';

export default function TaskInput() {
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log(taskName);
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        name='taskName'
        placeholder='Enter task...'
        value={taskName}
        onChange={handleChangeTaskName}
      />
      <button type='submit'>➕</button>
    </form>
  );
}
