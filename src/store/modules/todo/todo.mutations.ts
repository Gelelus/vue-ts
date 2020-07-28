import { MutationTree } from "vuex";
import { TodoState } from "./types";
import { initialTodoState } from "./index";
import { Todo } from "./types";

export const mutations: MutationTree<TodoState> = {
  editMode(state, payload: Todo) {
    let todo = { ...initialTodoState };
    if (payload) {
      todo = payload;
      state.edited = true;
      state.dialog = true;
    } else {
      state.edited = false;
      state.dialog = false;
    }
    Object.assign(state.editedTodo, todo);
  },
  setDetailTodo(state, payload: Todo) {
    state.detailTodo = payload;
  },
  openDialogWithDate(state, payload: Date){
    state.editedTodo.date = payload;
    state.dialog = true;
  },
  showDialog(state) {
    state.dialog = true;
  },
  closeDialog(state) {
    state.dialog = false;
  },
  setList(state, payload: Todo[]) {
    state.todos = payload;
  },
};
