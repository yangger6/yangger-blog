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
    console.log(Logs)
    if (Logs) {
      Logs = Logs.map((logDay, index) => {
        return index < 5 ? { ...logDay, show: true } : { ...logDay, show: false }
      })
      commit(types.RECEIVE_LOGS, { Logs })
    }
  },
  async addLogData ({ commit }, { data, index }) {
    var result = await posts.addLog({data: data})
    if (result.msg === 'success') {
      commit(types.ADD_LOGDATA, {
        data: result.data,
        selectLogIndex: index
      })
    }
  },
  async removeLog ({ commit, state }, Index) {
    commit(types.REMOVE_LOG, Index)
    let result = await posts.removeLog({
      _id: state.logs[Index.selectLogIndex]._id,
      data: state.logs[Index.selectLogIndex].data
    })
    console.log(`remove log is ${result}`)
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
   * @param selectLogIndex 那一天的Index
   * @param LogIndex 那一天的那一条日志的Index
   */
  [types.REMOVE_LOG] (state, { selectLogIndex, LogIndex }) {
    state.logs[selectLogIndex].data.splice([LogIndex], 1)
  },
  /**
   * 往某天添加某条日志
   * @param state
   * @param selectLogIndex 那一天的index
   * @param data 日志的数据
   */
  [types.ADD_LOGDATA] (state, {selectLogIndex, data}) {
    state.logs[selectLogIndex].data = data.data
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
