import { Module } from 'vuex';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ProfileState } from './types';
import { RootState } from '../types';

export const state: ProfileState = {
  error: false,
  openPage: false,
  theme: {
    secondary: '#5A5AFF',
    dominant: 'rgb(72, 109, 131)',
  },
  blogId: 0,
};

const namespaced: boolean = true;

export const profile: Module<ProfileState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
