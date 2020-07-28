import { ActionTree } from "vuex";
import axios from "axios";
import { UserState, User, AuthData } from "./types";
import { RootState } from "../../types";

export const actions: ActionTree<UserState, RootState> = {
  authSignup({ commit }, payload: AuthData) {
    axios.post<User>("http://localhost:4200/users", payload).then((res) => {
      localStorage.setItem("UserData", JSON.stringify(res.data));
      commit("authSuccess", res.data);
    });
  },
  authLogin({ commit }, payload: AuthData) {
    axios.post<User>("http://localhost:4200/users/login", payload).then((res) => {
      localStorage.setItem("UserData", JSON.stringify(res.data));
      commit("authSuccess", res.data);
    });
  },
  autoLogin({ commit }) {
    const userData = JSON.parse(localStorage.getItem("UserData") || "") as User;
    if (userData && userData.token) {
      userData.redirect = true;
      commit("authSuccess", userData);
    }
  },
};
