import { Module } from "vuex";
import { getters } from "./calendar.getters";
import { actions } from "./calendar.actions";
import { mutations } from "./calendar.mutations";
import { CalendarState } from "./types";
import { RootState } from "../../types";

export const state: CalendarState = {
  freeDays: [{ name: "123", month: 12, day: 100 }],
  commonTodos: [],
  monthTodos: [],
  weekTodos: [],
  dayTodos: [],
};

const namespaced = false;

export const calendar: Module<CalendarState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
