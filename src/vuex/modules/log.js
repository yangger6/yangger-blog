/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  logs: []
}
// getters
const getters = {
  logs: state => state.logs,
  // logCount: state => [...state.logs.map(log => log.data.length)].reduce((prev, curr) => prev + curr, 0)
  logCount (state) {
    return state.logs.reduce((prev, curr) => {
      return (prev.data ? prev.data.length : prev) + curr.data.length
    }, 0)
  }
}

// actions
const actions = {
  async getLogs ({ commit }) {
    let Logs = await posts.getLogs()
    Logs = Logs.map((logDay, index) => {
      return index < 5 ? { ...logDay, show: true } : { ...logDay, show: false }
    })
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
  /**
   * 添加Log到store
   * @param state
   * @param Log 新增的log
   */
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
  },
  [types.CHANGE_LOGSTATE] (state, { _id, show }) {
    state.logs.find(log => log._id === _id).show = !show
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
