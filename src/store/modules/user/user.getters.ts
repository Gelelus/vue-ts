import { GetterTree } from 'vuex';
import { UserState } from './types';
import { RootState } from '../../types';

export const getters: GetterTree<UserState, RootState> = {
    user: state => {
      return state.user;
    },
    token: state => {
      if (state.user) {
        return state.user.token;
      }
      return null;
    }
  };