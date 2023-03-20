import { Todo } from '../../@types/todo.type';

export type AddTodoType = {
  type: 'ADD_TODO';
  payload: string;
};

export type UpdateTodoType = {
  type: 'UPDATE_TODO';
  payload: Todo;
};

export type RemoveTodoType = {
  type: 'REMOVE_TODO';
  payload: string;
};

export type DoneTodoType = {
  type: 'DONE_TODO';
  payload: {
    taskId: string;
    done: boolean;
  };
};

export type SetCurrentTodoType = {
  type: 'SET_CURRENT_TODO';
  payload: Todo | null;
};

export type SetTodosType = {
  type: 'SET_TODOS';
  payload: Todo[];
};

export type ActionType =
  | AddTodoType
  | UpdateTodoType
  | RemoveTodoType
  | DoneTodoType
  | SetCurrentTodoType
  | SetTodosType;

export function setCurrentTodoAction(todo: Todo | null) {
  return {
    type: 'SET_CURRENT_TODO',
    payload: todo
  } as SetCurrentTodoType;
}

export function addTodoAction(todoName: string) {
  return {
    type: 'ADD_TODO',
    payload: todoName
  } as AddTodoType;
}

export function updateTodoAction(todo: Todo) {
  return {
    type: 'UPDATE_TODO',
    payload: todo
  } as UpdateTodoType;
}

export function removeTodoAction(todoId: string) {
  return {
    type: 'REMOVE_TODO',
    payload: todoId
  } as RemoveTodoType;
}

export function doneTodoAction(taskId: string, done: boolean) {
  return {
    type: 'DONE_TODO',
    payload: {
      taskId,
      done
    }
  } as DoneTodoType;
}

export function setTodosAction(todos: Todo[]) {
  return {
    type: 'SET_TODOS',
    payload: todos
  } as SetTodosType;
}
