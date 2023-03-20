import { Todo } from '../../@types/todo.type';
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

}
