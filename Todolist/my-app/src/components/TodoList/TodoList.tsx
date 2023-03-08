import { useEffect, useState } from 'react';
import { Todo } from '../../@types/todo.type';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import styles from './todoList.module.scss';

type HandleNewTodo = (todo: Todo[]) => Todo[];

const syncReactToLocalStorage = (handleNewTodo: HandleNewTodo) => {
  const todoString = localStorage.getItem('todos');
  const todoObject: Todo[] = JSON.parse(todoString || '[]');
  const newTodoObject = handleNewTodo(todoObject);
  localStorage.setItem('todos', JSON.stringify(newTodoObject));
};

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    const todoObject: Todo[] = JSON.parse(todoString || '[]');
    setTodos(todoObject);
  }, []);

  const handleAddTodo = (name: string) => {
    const newTodo = {
      name,
      done: false,
      id: new Date().toISOString()
    };

    const handler = (todoObject: Todo[]) => {
      return [...todoObject, newTodo];
    };

    setTodos(handler);
    syncReactToLocalStorage(handler);
  };

  const updateTaskTodo = (newTodo: Todo) => {
    const handler = (todoObject: Todo[]) => {
      const newTodos = todoObject.map((todo) => {
        if (todo.id === newTodo.id) {
          return newTodo;
        }
        return todo;
      });
      return newTodos;
    };

    setTodos(handler);
    setCurrentTodo(null);
    syncReactToLocalStorage(handler);
  };

  const assignCurrentTodo = (todo: Todo) => {
    setCurrentTodo(todo);
  };

  const handleDoneTask = (taskId: string, done: boolean) => {
    const handler = (todoObject: Todo[]) => {
      const newTodos = todoObject.map((todo) => {
        if (todo.id === taskId) {
          return { ...todo, done };
        }
        return todo;
      });

      return newTodos;
    };

    setTodos(handler);
    syncReactToLocalStorage(handler);
  };

  const removeTodo = (todoId: string) => {
    const handler = (todoObject: Todo[]) => {
      const newTodos = todoObject.filter((todo) => todo.id !== todoId);
      return newTodos;
    };

    if (currentTodo) {
      setCurrentTodo(null);
    }
    setTodos(handler);
    syncReactToLocalStorage(handler);
  };

  const doneTaskList = todos.filter((todo) => todo.done);
  const notDoneTaskList = todos.filter((todo) => !todo.done);

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <h1 className={styles.title}>Todo list</h1>
        <TaskInput
          handleAddTodo={handleAddTodo}
          currentTodo={currentTodo}
          updateTaskTodo={updateTaskTodo}
        />
        <TaskList
          todos={notDoneTaskList}
          handleDoneTask={handleDoneTask}
          assignCurrentTodo={assignCurrentTodo}
          removeTodo={removeTodo}
        />
        <TaskList
          taskListDone
          todos={doneTaskList}
          handleDoneTask={handleDoneTask}
          assignCurrentTodo={assignCurrentTodo}
          removeTodo={removeTodo}
        />
      </div>
    </div>
  );
}
