import { Module } from "vuex";
import { getters } from "./todo.getters";
import { actions } from "./todo.actions";
import { mutations } from "./todo.mutations";
import { TodoState, Todo } from "./types";
import { RootState } from "../../types";


export const initialTodoState: Todo = {
    name: "",
    description: "",
    todoType: "Common",
    date: new Date(),
    _id: "",
    generalDate: '',
    todoChecked: ''
  };

export const state: TodoState = {
    todos: [],
    editedTodo: { ...initialTodoState },
    dialog: false,
    edited: false,
    detailTodo: { ...initialTodoState },
};

const namespaced = false;

export const todo: Module<TodoState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
