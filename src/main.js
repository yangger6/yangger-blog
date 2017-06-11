// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import index from './components/index'
Vue.config.productionTip = false
index.install(Vue)
/* eslint-disable no-new */

/* Pick one way between the 2 following ways */

// only import the icons you use to reduce bundle size
import 'vue-awesome/icons/flag'

// or import all icons if you don't care about bundle size
import 'vue-awesome/icons'

/* Register component with one of 2 methods */

import Icon from 'vue-awesome/components/Icon'

// globally (in your main .js file)
Vue.component('icon', Icon)
new Vue({
  el: '#app',
  router,
  // template: '<App/>',
  // components: { App }
  ...App
})
