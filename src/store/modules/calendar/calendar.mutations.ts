import { MutationTree } from "vuex";
import { CalendarState, TodoData, freeDay } from "./types";

export const mutations: MutationTree<CalendarState> = {
  setfreeDays(state, payload: freeDay[]) {
    state.freeDays = payload;
  },
  setTodos(state, payload: TodoData) {
    state.commonTodos = payload.commonTodos;
    state.monthTodos = payload.monthTodos;
    state.weekTodos = payload.weekTodos;
    state.dayTodos = payload.dayTodos;
  },
};
