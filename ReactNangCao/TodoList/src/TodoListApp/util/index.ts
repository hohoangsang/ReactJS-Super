import { Todo } from '../../@types/todo.type';

export const removeTodoHandler = (todoId: string) => (todos: Todo[]) => {
  const newTodos = todos.filter((todo) => todo.id !== todoId);
  return newTodos;
};

export const addTodoHander = (newTodoName: string) => (todos: Todo[]) => {
  const newTodo = {
    name: newTodoName,
    done: false,
    id: new Date().toISOString()
  };

  return [...todos, newTodo];
};

export const updateTodoHandler = (newTodo: Todo) => (todos: Todo[]) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === newTodo.id) {
      return newTodo;
    }
    return todo;
  });
  return newTodos;
};

export const doneTodoHandler = (todoId: string, done: boolean) => (todos: Todo[]) => {
  const newTodos = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, done };
    }
    return todo;
  });

  return newTodos;
};
