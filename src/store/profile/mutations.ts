import { MutationTree } from 'vuex';
import {BLOGID_CHANGE, DOMINANT_CHANGE, OPENPAGE_CHANGE, ProfileState, SECONDARY_CHANGE} from './types';

export const mutations: MutationTree<ProfileState> = {
  [DOMINANT_CHANGE](state: ProfileState, payload: string) {
    state.schema.dominant = payload;
  },
  [SECONDARY_CHANGE](state: ProfileState, payload: string) {
    state.schema.secondary = payload;
  },
  [OPENPAGE_CHANGE](state: ProfileState, payload: boolean) {
    state.schema.openPage = payload;
  },
  [BLOGID_CHANGE](state: ProfileState, payload: number) {
    state.blogId = payload;
  },
};
