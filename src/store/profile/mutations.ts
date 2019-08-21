import { MutationTree } from 'vuex';
import {DOMINANT_CHANGE, OPENPAGE_CHANGE, ProfileState, SECONDARY_CHANGE} from './types';

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
};
