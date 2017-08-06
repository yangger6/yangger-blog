/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  user: {}
}
// getters
const getters = {
  user: state => state.user
}

// actions
const actions = {
  async userLogin ({ commit }, Login) {
    const result = await posts.userLogin(Login)
    if (result.msg === 'success') {
      commit(types.UPDATE_USER, result)
      console.log(`Login is ${result.msg}`)
      return true
    } else {
      if (result.data) {
        console.log(`Login error is :${result.data}`)
      } else {
        result.map(err => console.log(err.errorMessage))
      }
      return false
    }
  }
}

// mutations
const mutations = {
  /**
   * 接受post到的数据存入store
   * @param state
   * @param UserInfo 用户信息
   */
  [types.UPDATE_USER] (state, { data }) {
    state.user = data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
