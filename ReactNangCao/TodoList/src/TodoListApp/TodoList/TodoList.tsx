import { useEffect, useReducer, useState } from 'react';
import { Todo } from '../../@types/todo.type';
import {
  addTodoAction,
  doneTodoAction,
  removeTodoAction,
  setCurrentTodoAction,
  setTodosAction,
  updateTodoAction
} from '../reducer/actions';
import reducer, { initialState } from '../reducer/reducer';
import TaskInput from '../TaskInput';
import TaskList from '../TaskList';
import { addTodoHander, doneTodoHandler, removeTodoHandler, updateTodoHandler } from '../util';
import styles from './todoList.module.scss';

type HandleNewTodo = (todo: Todo[]) => Todo[];

const syncReactToLocalStorage = (handleNewTodo: HandleNewTodo) => {
  const todoString = localStorage.getItem('todos');
  const todoObject: Todo[] = JSON.parse(todoString || '[]');
  const newTodoObject = handleNewTodo(todoObject);
  localStorage.setItem('todos', JSON.stringify(newTodoObject));
};

export default function TodoList() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { currentTodo, todos } = state;

  useEffect(() => {
    const todoString = localStorage.getItem('todos');
    const todoObject: Todo[] = JSON.parse(todoString || '[]');
    dispatch(setTodosAction(todoObject));
  }, []);

  const handleAddTodo = (name: string) => {
    dispatch(addTodoAction(name));
    syncReactToLocalStorage(addTodoHander(name));
  };

  const updateTaskTodo = (newTodo: Todo) => {
    dispatch(updateTodoAction(newTodo));
    dispatch(setCurrentTodoAction(null));
    syncReactToLocalStorage(updateTodoHandler(newTodo));
  };

  const assignCurrentTodo = (todo: Todo) => {
    dispatch(setCurrentTodoAction(todo));
  };

  const handleDoneTask = (taskId: string, done: boolean) => {
    dispatch(doneTodoAction(taskId, done));
    syncReactToLocalStorage(doneTodoHandler(taskId, done));
  };

  const removeTodo = (todoId: string) => {
    dispatch(removeTodoAction(todoId));
    syncReactToLocalStorage(removeTodoHandler(todoId));
  };

  const doneTaskList = todos.filter((todo) => todo.done);
  const notDoneTaskList = todos.filter((todo) => !todo.done);

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={handleAddTodo} currentTodo={currentTodo} updateTaskTodo={updateTaskTodo} />
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
