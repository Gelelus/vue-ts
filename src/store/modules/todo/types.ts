export interface Todo {
  name: string;
  description: string;
  todoType: string;
  date: Date | string;
  _id: string;
  generalDate: string;
  todoChecked: string | Date;
}

export interface TodoState {
  todos: Todo[];
  editedTodo: Todo;
  dialog: boolean;
  edited: boolean;
  detailTodo: Todo;
}

export interface ResGetTodoList {
  weekTodos: Todo[];
  dayTodos: Todo[];
  commonTodos: Todo[];
  monthTodos: Todo[];
}
