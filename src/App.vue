<template>
  <div id="app">
    <v-header></v-header>
    <main>
      <router-view></router-view>
    </main>
    <footer>
      <v-canvas></v-canvas>
    </footer>
  </div>
</template>
<script>
  import { mapState } from 'vuex' // vuex 工具
  import localStroe from './localStore' // 本地储存
  import posts from './post/post' // 数据库取数据
  import canvas from './components/Tools/canvas/canvas.vue' // 引用canvas
  import header from './components/Tools/header/header.vue'
  export default {
    data () {
      return {
        imgSrc: '/static/head.png',
        counter: 1,
        scrollWidth: 0
      }
    },
    methods: {
      async fetchData () {  // 从数据库取数据
        let resultBlog = await posts.getBlogs(this)
        this.$store.commit('pushBlogs', resultBlog)
        let resultLog = await posts.getLogs(this)
        this.$store.commit('pushLogs', resultLog)
      }
    },
    computed: mapState({
      user: 'user',
      blog: 'blog',
      selectIndex: 'selectIndex',
      admin: 'admin',
      headerShow: 'headerShow',
      log: 'log'
    }),
    created () {
      if (this.$route.path === '/') {
        this.$store.commit('changHeaderShow', false)
      }
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      scrollWidth () {
        this.showNav = this.$el.scrollWidth < 500
      },
      selectIndex: {
        deep: true,
        handler () {
          localStroe.save({
            user: this.user,
            blog: this.blog,
            selectIndex: this.selectIndex,
            admin: this.admin,
            headerShow: this.headerShow,
            log: this.log
          })
        }
      }
    },
    components: {
      'v-canvas': canvas,
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
