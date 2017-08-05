/**
 * Created by yangger on 2017/7/31.
 */
import * as types from '../mutation-types'
// initial state
const state = {
  headerShow: true
}
// getters
const getters = {
  headerShow: state => state.headerShow
}

// actions
const actions = {
  async changeHeaderShow ({ commit }, Boolean) {
    commit(types.CHANGE_HEADERSHOW, Boolean)
  }
}

// mutations
const mutations = {
  /**
   * 修改导航条是否出现
   * @param state
   * @param Boolean
   */
  [types.CHANGE_HEADERSHOW] (state, Boolean) {
    state.headerShow = Boolean
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
