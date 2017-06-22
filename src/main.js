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
    selectIndex: serverData.selectIndex,
    // 导航是否隐藏
    headerShow: true,
    // 管理中心
    admin: serverData.admin
  },
  mutations: {
    changBlogIndex (state, index) {
      state.selectIndex = index
    },
    changAdminIndex (state, index) {
      state.admin.selectIndex = index
    },
    changAdminType (state, type) {
      state.admin.type = type
    },
    changAdminBlog (state, payload) {
      state.admin.blog = payload
    },
    changHeaderShow (state, boolean) {
      state.headerShow = boolean
    },
    search (state, value) {
      state.userList = state.userList.filter(item => item.name.indexOf(value) > -1)
    },
    pushBlogs (state, payload) {  // 将所有blog填入本地储存
      state.blog = payload
    },
    updateBlog (state, payload) { // 点击进入文章的时候更新博客内容
      state.blog[state.selectIndex] = payload
    },
    pushBlog (state, payload) {
      state.blog.push(payload)  // 新增博客
      state.selectIndex = state.blog.length - 1 // -1 是因为数组的下标是从0开始的
    },
    removeBlog (state, index) {
      state.blog.splice(index, 1)
      state.selectIndex = 0
    },
    updateUser (state, payload) {
      state.user = payload
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
