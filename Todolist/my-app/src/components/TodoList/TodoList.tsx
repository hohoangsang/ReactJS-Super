import { useState } from 'react';
import { Todo } from '../../@types/todo.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import styles from './todoList.module.scss';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>();

  const handleAddTodo = (name: string) => {
    const newTodo = {
      name,
      done: false,
      id: new Date().toISOString()
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);
  };

  const updateTaskTodo = (newTodo: Todo) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });

    setTodos(newTodos);
    setCurrentTodo(null);
  };

  const handleDoneTask = (taskId: string, done: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === taskId) {
        return { ...todo, done };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  console.log(todos);

  const doneTaskList = todos.filter((todo) => todo.done);
  const notDoneTaskList = todos.filter((todo) => !todo.done);

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <h1 className={styles.title}>Todo list</h1>
        <TaskInput handleAddTodo={handleAddTodo} />
        <TaskList todos={notDoneTaskList} handleDoneTask={handleDoneTask} />
        <TaskList taskListDone todos={doneTaskList} handleDoneTask={handleDoneTask} />
      </div>
    </div>
  );
}
