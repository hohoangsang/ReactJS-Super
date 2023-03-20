import { Todo } from '../../@types/todo.type';
import { addTodoHander, doneTodoHandler, removeTodoHandler, updateTodoHandler } from '../util';
import { ActionType } from './actions';

type InitialStateType = {
  todos: Todo[];
  currentTodo: Todo | null;
};

export const initialState: InitialStateType = {
  todos: [],
  currentTodo: null
};

export default function reducer(state: InitialStateType, action: ActionType) {
  let newTodos: Todo[] = [];
  switch (action.type) {
    case 'SET_CURRENT_TODO':
      return { ...state, currentTodo: action.payload };

    case 'ADD_TODO':
      newTodos = addTodoHander(action.payload)(state.todos);
      return { ...state, todos: newTodos };

    case 'UPDATE_TODO':
      newTodos = updateTodoHandler(action.payload)(state.todos);
      return { ...state, todos: newTodos };

    case 'REMOVE_TODO':
      newTodos = removeTodoHandler(action.payload)(state.todos);
      return { ...state, todos: newTodos };

    case 'DONE_TODO':
      const { taskId, done } = action.payload;
      newTodos = doneTodoHandler(taskId, done)(state.todos);
      return { ...state, todos: newTodos };

    case 'SET_TODOS':
      return { ...state, todos: action.payload };
    default:
      return state;
  }
}
