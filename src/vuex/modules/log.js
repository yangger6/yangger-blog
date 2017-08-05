/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit2/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  logs: []
}
// getters
const getters = {
  logs: state => state.logs
}

// actions
const actions = {
  async getLogs ({ commit }) {
    const Logs = await posts.getLogs()
    commit(types.RECEIVE_LOGS, { Logs })
  }
}

// mutations
const mutations = {
  /**
   * 接受post到的数据存入store
   * @param state
   * @param Logs 日志数据
   */
  [types.RECEIVE_LOGS] (state, { Logs }) {
    state.logs = Logs
  },
  [types.ADD_LOG] (state, Log) {
    state.logs.push(Log)
  },
  /**
   * 删除某天的某条日志
   * @param state
   * @param SelectIndex 那一天的Index
   * @param LogIndex 那一天的那一条日志的Index
   */
  [types.REMOVE_LOG] (state, { SelectIndex, LogIndex }) {
    state.logs[SelectIndex].data.splice([LogIndex], 1)
  },
  /**
   * 往某天添加某条日志
   * @param state
   * @param SelectIndex 那一天的index
   * @param Data 日志的数据
   */
  [types.ADD_LOGDATA] (state, {SelectIndex, Data}) {
    state.logs[SelectIndex].data = Data
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
