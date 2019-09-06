import { MutationTree } from 'vuex';
import {
  BLOGID_CHANGE,
  DOMINANT_CHANGE,
  ITheme,
  OPENPAGE_CHANGE,
  ProfileState,
  SECONDARY_CHANGE,
  THEME_CHANGE,
} from './types';

export const mutations: MutationTree<ProfileState> = {
  [DOMINANT_CHANGE](state: ProfileState, payload: string) {
    state.theme.dominant = payload;
  },
  [SECONDARY_CHANGE](state: ProfileState, payload: string) {
    state.theme.secondary = payload;
  },
  [THEME_CHANGE](state: ProfileState, payload: ITheme) {
    state.theme = payload;
  },
  [OPENPAGE_CHANGE](state: ProfileState, payload: boolean) {
    state.openPage = payload;
  },
  [BLOGID_CHANGE](state: ProfileState, payload: number) {
    state.blogId = payload;
  },
};
