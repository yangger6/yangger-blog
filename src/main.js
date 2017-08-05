// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import index from './components/index'
Vue.config.productionTip = false
// 全局注册写好的组件
index.install(Vue)
/* eslint-disable no-new */

// 引用图标库
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
Vue.component('icon', Icon)
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  ...App
})
