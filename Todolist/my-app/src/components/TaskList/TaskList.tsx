import React from 'react';
import { Todo } from '../../@types/todo.type';
import styles from './taskList.module.scss';

interface TaskListProps {
  taskListDone?: boolean;
  todos: Todo[];
  handleDoneTask: (taskId: string, done: boolean) => void;
  assignCurrentTodo: (todo: Todo) => void;
  removeTodo: (todoId: string) => void;
}

export default function TaskList(props: TaskListProps) {
  const { taskListDone, todos, handleDoneTask, assignCurrentTodo, removeTodo } = props;

  const handleCheckTask = (taskId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    handleDoneTask(taskId, event.target.checked);
  };

  const handleSelectedTaskUpdate = (todo: Todo) => {
    assignCurrentTodo(todo);
  };

  const handleRemoveTodo = (todoId: string) => {
    removeTodo(todoId);
  };

  return (
    <div className={styles.taskListContainer}>
      <h3 className={styles.title}>{taskListDone ? 'Hoàn thành' : 'Chưa hoàn thành'}</h3>

      <div className={styles.taskList}>
        {todos.map((todo) => (
          <div className={styles.task} key={todo.id}>
            <input
              type='checkbox'
              name='taskCheckBox'
              className={styles.taskCheckBox}
              checked={todo.done}
              onChange={handleCheckTask(todo.id)}
            />
            <span className={`${styles.taskName} ${todo.done ? styles['taskName-done'] : ''}`}>
              {todo.name}
            </span>
            <div className={styles.taskAction}>
              <button
                className={`${styles.taskBtn}`}
                onClick={() => handleSelectedTaskUpdate(todo)}
              >
                🖋
              </button>
              <button className={styles.taskBtn} onClick={() => handleRemoveTodo(todo.id)}>
                🗑
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
