// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import index from './components/index'
import localStroe from './localStore'
import VueResource from 'vue-resource'
Vue.config.productionTip = false
// 全局注册写好的组件
index.install(Vue)
/* eslint-disable no-new */

// 引用图标库
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)

// 取数据和本地缓存=。=
Vue.use(Vuex)
Vue.use(VueResource)
let serverData = localStroe.fetch()
const store = new Vuex.Store({
  strict: true,
  state: {
    // 登录用户
    user: serverData.user,
    // 博客列表
    blog: serverData.blog,
    // 当前选中的博客
    selectIndex: serverData.selectIndex
  },
  mutations: {
    changSessionIndex (state, index) {
      state.sessionIndex = index
    },
    search (state, value) {
      state.userList = state.userList.filter(item => item.name.indexOf(value) > -1)
    },
    pushMsg (state, payload) {
      state.sessionList[state.sessionIndex].messages.push(payload)
      state.userList[state.sessionIndex].lastMsg = payload.text
    }
  }
})

new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
  ...App
})
