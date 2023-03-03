import React from 'react';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import styles from './todoList.module.scss';

export default function TodoList() {
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <h1 className={styles.title}>Todo list</h1>
        <TaskInput />
        <TaskList />
        <TaskList taskListDone />
      </div>
    </div>
  );
}
