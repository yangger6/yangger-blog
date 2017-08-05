/**
 * Created by yangger on 2017/7/30.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import blog from './modules/blog'
import admin from './modules/admin'
import log from './modules/log'
import user from './modules/user'
import head from './modules/head'
Vue.use(Vuex)
export default new Vuex.Store({
  strict: true,
  actions,
  getters,
  // 组合各个模块
  modules: {
    blog,
    admin,
    log,
    user,
    head
  }
})
