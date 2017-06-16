<template>
  <div id="app">
    <header :class="{open: openNav}">
      <top-bar :size="size" class="head-list">
        <list>
          <li><router-link to="/">首页</router-link></li>
          <li><router-link to="/posts">文章</router-link></li>
          <li><a href="https://github.com/yangger6">Github</a></li>
          <li><router-link to='/about'>关于我</router-link></li>
        </list>
      </top-bar>
      <div class="header-toggle" @click="changeNav">
        <icon name="reorder"></icon>
      </div>
    </header>
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
  import canvas from './components/canvas/canvas.vue'
  export default {
    data () {
      return {
        size: 'medium',
        imgSrc: '/static/head.png',
        openNav: true,
        counter: 1,
        scrollWidth: 0
      }
    },
    methods: {
      changeNav () {
        this.openNav = !this.openNav
      },
      async fetchData () {  // 从数据库取数据
        let that = this
        let result = await posts.getBlogs(that)
        this.$store.commit('pushBlogs', result)
      }
    },
    mounted () {
    },
    computed: mapState({
      user: 'user',
      blog: 'blog',
      selectIndex: 'selectIndex'
    }),
    created () {
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
            selectIndex: this.selectIndex
          })
        }
      }
    },
    components: {
      'v-canvas': canvas
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "/components/gobal";
</style>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "App";
</style>
