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
  import { mapMutations, mapGetters } from 'vuex' // vuex 工具
  export default{
    data () {
      return {
        size: 'medium',
        toggleShow: true
      }
    },
    computed: {
      ...mapGetters({
        openNav: 'headerShow'
      })
    },
    methods: {
      ...mapMutations({
        changHeaderShow: 'CHANGE_HEADERSHOW'
      }),
      changeNav () {
        this.changHeaderShow(!this.openNav)
      },
      routeNav () {
        let route = this.$route
        if (route.path.match(/admin/) !== null) {
          this.changHeaderShow(false)
        } else if (route.path !== '/') {
          this.toggleShow = false
          this.changHeaderShow(true)
        } else if (route.path === '/') {
          this.changHeaderShow(false)
        }
      }
    },
    watch: {
      '$route': 'routeNav'
    }
  }
</script>
