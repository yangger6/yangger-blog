/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit2/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  user: []
}
// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  async updateUser ({ commit }, Login) {
    const UserInfo = await posts.userLogin(Login)
    commit(types.UPDATE_USER, { UserInfo })
  }
}

// mutations
const mutations = {
  /**
   * 接受post到的数据存入store
   * @param state
   * @param UserInfo 用户信息
   */
  [types.UPDATE_USER] (state, { UserInfo }) {
    state.user = UserInfo
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
