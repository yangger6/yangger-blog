<template>
  <div id="app">
    <v-header></v-header>
    <main>
      <router-view></router-view>
    </main>
    <footer v-if="(/\/blog|\/post/).test($route.fullPath)">
      <!--<v-canvas></v-canvas>-->
      Copyright ©2017-2019 yangger by Vue and Koa 粤ICP备17084298号-1
    </footer>
  </div>
</template>
<script>
  import store from './vuex/index'
  import { mapGetters, mapMutations, mapActions } from 'vuex' // vuex 工具
  import localStroe from './localStore' // 本地储存
  //  import posts from '@/unit/post' // 数据库取数据
  //  import store from '@/vuex/index'
  //  import canvas from './components/tools/canvas/canvas.vue' // 引用canvas
  import header from './components/tools/header/header.vue'
  export default {
    store,
    name: 'blog',
    data () {
      return {
        imgSrc: '/static/head.png',
        counter: 1,
        scrollWidth: 0
      }
    },
    methods: {
      ...mapMutations({
        changHeaderShow: 'CHANGE_HEADERSHOW'
      }),
      ...mapActions([
        'getBlogs',
        'getLogs'
      ])
    },
    computed: {
      ...mapGetters({
        user: 'user',
        blog: 'blogs',
        selectIndex: 'blogSelectIndex',
        admin: 'admin',
        headerShow: 'headerShow',
        log: 'logs'
      })
    },
    async created () {
      if (this.$route.path === '/') {
        this.changHeaderShow(false)
      }
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      await this.getBlogs()
      await this.getLogs()
    },
    watch: {
      selectIndex () {
        localStroe.save({
          user: this.user,
          blog: this.blog,
          selectIndex: this.selectIndex,
          admin: this.admin,
          headerShow: this.headerShow,
          log: this.log
        })
      }
    },
    components: {
//        'v-canvas': canvas,
      'v-header': header
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "/components/gobal";
</style>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "App";
</style>
