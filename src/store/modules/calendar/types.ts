import { Todo } from "../todo/types";

export interface freeDay {
  name: string;
  month: number;
  day: number;
}

export interface CalendarState {
  freeDays: freeDay[];
  commonTodos: Todo[];
  monthTodos: Todo[];
  weekTodos: Todo[];
  dayTodos: Todo[];
}

export interface TodoData {
  commonTodos: Todo[];
  monthTodos: Todo[];
  weekTodos: Todo[];
  dayTodos: Todo[];
}

export interface GoogleHolidayData {// неполная дата только нужная мне
  items: { summary: string; start: { date: string } }[];
}
