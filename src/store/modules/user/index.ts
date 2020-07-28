import { Module } from "vuex";
import { getters } from "./user.getters";
import { actions } from "./user.actions";
import { mutations } from "./user.mutations";
import { UserState } from "./types";
import { RootState } from "../../types";


export const state: UserState = {
    user: null
};

const namespaced = false;

export const user: Module<UserState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
