import { GetterTree } from 'vuex';
import { CalendarState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<CalendarState, RootState> = {
    freeDays: state => state.freeDays,
    commonTodos: state => state.commonTodos,
    monthTodos: state => state.monthTodos,
    weekTodos: state => state.weekTodos,
    dayTodos: state => state.dayTodos,
    todoDays: state => [
      state.dayTodos,
      state.weekTodos,
      state.monthTodos,
      state.commonTodos
    ]
  };
  