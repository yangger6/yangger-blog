<template>
  <header :class="{open: openNav}">
    <top-bar :size="size" class="head-list">
      <list>
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/posts">文章</router-link></li>
        <li><a href="https://github.com/yangger6">Github</a></li>
        <li><router-link to='/about'>关于我</router-link></li>
      </list>
    </top-bar>
    <div class="header-toggle" @click="changeNav" v-show="toggleShow">
      <icon name="reorder"></icon>
    </div>
  </header>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "header";
</style>
<script>
  export default{
    data () {
      return {
        size: 'medium',
        toggleShow: true
      }
    },
    computed: {
      openNav () {
        return this.$store.state.headerShow
      }
    },
    methods: {
      changeNav () {
        let state = this.$store.state.headerShow
        this.$store.commit('changHeaderShow', !state)
      },
      routeNav () {
        let route = this.$route
        let store = this.$store
        if (route.path.match(/admin/) !== null) {
          store.commit('changHeaderShow', false)
        } else if (route.path !== '/') {
          this.toggleShow = false
          store.commit('changHeaderShow', true)
        } else if (route.path === '/') {
          this.toggleShow = true
          store.commit('changHeaderShow', false)
        }
      }
    },
    watch: {
      '$route': 'routeNav'
    }
  }
</script>
