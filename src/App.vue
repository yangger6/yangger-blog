<template>
  <div id="app" >
    <header>
      <top-bar :size="size">
        <head-img :src="imgSrc" class="head"></head-img>
        <list class="head-list">
          <li><a href="">首页</a></li>
          <li><a href="">文章</a></li>
          <li><a href="">Github</a></li>
          <li><a href="">关于我</a></li>
        </list>
      </top-bar>
      <nav class="nav-left"  :class="openNav ? 'nav-opened' : 'nav-close'">
      </nav>
      <span class="nav-cover" :class="{openCover: openNav}" @clcik="openNav = !openNav"></span>
    </header>
    <main class="content">
      <button style="z-index: 999;position: absolute" @click="openNav = !openNav">cnm</button>
      <router-view></router-view>
    </main>
    <footer>
    </footer>
  </div>
</template>
<script>
export default {
  data () {
    return {
      size: 'medium',
      imgSrc: '/static/head.png',
      openNav: false,
      counter: 1
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "/components/gobal";
</style>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "App";
</style>
