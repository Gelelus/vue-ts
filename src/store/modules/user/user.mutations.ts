import { MutationTree } from "vuex";
import { UserState, User } from "./types";
import router from "../../../router/index";

export const mutations: MutationTree<UserState> = {
    logout(state) {
      state.user = null;
      localStorage.removeItem("UserData");
      router.push({ name: "Auth" });
    },
    authSuccess(state, payload: User) {
      state.user = payload;
      if (!payload.redirect) {
        router.push({ name: "Todos" });
      }
    }
  };
