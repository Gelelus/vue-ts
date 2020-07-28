import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { todo } from "./modules/todo/index";
import { user } from "./modules/user/index";
import { calendar } from "./modules/calendar/index";
import { RootState } from "./types";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  modules: {
    todo,
    user,
    calendar,
  },
};

export default new Vuex.Store<RootState>(store);
