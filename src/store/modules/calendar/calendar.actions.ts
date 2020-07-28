import { ActionTree } from "vuex";
import axios from "axios";
import { CalendarState, GoogleHolidayData, TodoData} from "./types";
import { RootState } from "../../types";

function apiGetterUrl(minDate = "2020-11-01", maxDate = "2021-11-01") {
  return `https://clients6.google.com/calendar/v3/calendars/ru.by%23holiday@group.v.calendar.google.com/events?calendarId=ru.by%23holiday%40group.v.calendar.google.com&singleEvents=true&timeZone=Europe%2FMinsk&maxAttendees=1&maxResults=250&sanitizeHtml=true&timeMin=${minDate}T00%3A00%3A00%2B03%3A00&timeMax=${maxDate}T00%3A00%3A00%2B03%3A00&key=AIzaSyBNlYH01_9Hc5S1J9vuFmu2nUqBZJNAXxs`;
}

export const actions: ActionTree<CalendarState, RootState> = {
  getTodoDays({ commit }, payload: { year: number; month: number }) {
    axios
      .get<TodoData>("http://localhost:4200/todo/onMonth", {
        params: {
          year: payload.year,
          month: payload.month,
        },
      })
      .then((res) => {
        commit("setTodos", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  getfreeDays({ commit }) {
    axios
      .get<GoogleHolidayData>(apiGetterUrl())
      .then((res) => {
        const payload = res.data.items.map(
          (day) => {
            return {
              name: day.summary,
              month: +day.start.date.slice(-5, -3),
              day: +day.start.date.slice(-2),
            };
          }
        );
        commit("setfreeDays", payload);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
