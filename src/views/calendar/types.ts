import { Todo } from "./../../store/modules/todo/types";

export interface Holiday {
    name: string;
    month: number;
    day: number;
}

export interface dayData {
  day: number;
  date: { year: number; month: number };
  disable: boolean;
  chosen: boolean;
  month: number;
  holiday?: Holiday[];
  todos?: Todo[];
  out?: boolean;
}
