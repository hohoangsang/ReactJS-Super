import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './taskInput.module.scss';

interface TaskInputProps {
  handleAddTodo: (name: string) => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { handleAddTodo } = props;

  const [taskName, setTaskName] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const trimedTaskName = taskName.trim();

    if (!trimedTaskName) {
      setTaskName('');
      return;
    }

    handleAddTodo(trimedTaskName);
    setTaskName('');
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
