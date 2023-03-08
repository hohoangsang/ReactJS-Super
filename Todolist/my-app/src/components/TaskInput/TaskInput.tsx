import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Todo } from '../../@types/todo.type';
import styles from './taskInput.module.scss';

interface TaskInputProps {
  handleAddTodo: (name: string) => void;
  currentTodo: Todo | null | undefined;
  updateTaskTodo: (newTodo: Todo) => void;
}

export default function TaskInput(props: TaskInputProps) {
  const { handleAddTodo, currentTodo, updateTaskTodo } = props;

  const [taskName, setTaskName] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTaskName = taskName.trim();

    if (!trimedTaskName) {
      setTaskName('');
      return;
    }

    if (currentTodo) {
      updateTaskTodo({
        ...currentTodo,
        name: trimedTaskName
      });
    } else {
      handleAddTodo(trimedTaskName);
    }

    setTaskName('');
  };

  const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  useEffect(() => {
    if (currentTodo) {
      setTaskName(currentTodo.name);
    } else {
      setTaskName('');
    }
  }, [currentTodo]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type='text'
        name='taskName'
        placeholder='Enter task...'
        value={taskName}
        onChange={handleChangeTaskName}
      />
      <button type='submit'>{currentTodo ? '✔' : '➕'}</button>
    </form>
  );
}
