import { GetterTree } from 'vuex';
import {ISchema, ProfileState} from './types';
import { RootState } from '../types';

export const getters: GetterTree<ProfileState, RootState> = {
  schema(state: ProfileState): ISchema {
    return state.schema;
  },
};
