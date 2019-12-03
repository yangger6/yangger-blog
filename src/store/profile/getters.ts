import { GetterTree } from 'vuex';
import {ITheme, ProfileState} from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProfileState, RootState> = {
  theme(state: ProfileState): ITheme {
    return state.theme;
  },
};
