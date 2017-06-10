<template>
  <div style="  overflow-x: hidden;">
    <nav v-show="showNav" class="nav-left"  :class="openNav ? 'nav-opened' : 'nav-close'">
      <h3 class="nav-title">Menu</h3>
      <a href="#" class="nav-close" @click="changeNav">
        <span style="display: none">close</span>
      </a>
      <list>
          <li><a href="">首页</a></li>
          <li><a href="">文章</a></li>
          <li><a href="">Github</a></li>
          <li><a href="">关于我</a></li>
      </list>
    </nav>
    <span class="nav-cover" :class="{'openCover': openNav}" @click="changeNav"></span>
    <div id="app"  :class="openNav ? 'opened' : 'close'">
      <header>
        <top-bar :size="size" class="head-list">
          <head-img :src="imgSrc" class="head"></head-img>
          <a  v-show="showNav" class="menu-button" @click="changeNav">Menu</a>
          <list v-show="!showNav">
            <li><a href="">首页</a></li>
            <li><a href="">文章</a></li>
            <li><a href="">Github</a></li>
            <li><a href="">关于我</a></li>
          </list>
        </top-bar>
        <!--<div class="nav-cover" :class="{openCover: openNav}" @clcik="changNav" onclick="aaa()"></div>-->
      </header>
      <main class="content">
        <router-view></router-view>
      </main>
      <footer>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: 'medium',
      imgSrc: '/static/head.png',
      openNav: false,
      counter: 1,
      showNav: false
    }
  },
  methods: {
    changeNav () {
      this.openNav = !this.openNav
    }
  },
  mounted () {
    this.showNav = this.$el.scrollWidth < 500
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "/components/gobal";
</style>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "App";
</style>
