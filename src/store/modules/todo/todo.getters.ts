import { GetterTree } from 'vuex';
import { TodoState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<TodoState, RootState> = {
    todos: state => state.todos,
    dialog: state => state.dialog,
    editedTodo: state => state.editedTodo,
    edited: state => state.edited,
    detailTodo: state => state.detailTodo,
  };