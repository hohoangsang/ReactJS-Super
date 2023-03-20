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

export type ActionType = AddTodoType | UpdateTodoType | RemoveTodoType | DoneTodoType
