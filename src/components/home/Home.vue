<template>
  <div class='Home'>
    <div class="bg-line">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="Home-con">
      <div class="title">
        <h1 class="name">
          <div></div>
          <span class="font-animate"><a></a><a></a><a></a><a></a><a></a><a></a><a></a></span>
          <div></div>
        </h1>
        <div class="btn">
          <router-link to="/posts">
            <span>CLIKE INTO</span>
            <div class="line line-top"></div>
            <div class="line line-bottom"></div>
            <div class="line line-left"></div>
            <div class="line line-right"></div>
          </router-link>
        </div>
      </div>
    </div>
    <img src="/static/index.jpg" alt="">
    <footer class="copy-right">
      Copyright ©2017-2019 yangger by Vue and Koa 粤ICP备17084298号-1
    </footer>
    <!--<video src="/static/home.mp4" autoplay="autoplay"></video>-->
  </div>
</template>
<script>
  export default {
    name: 'Home',
    data () {
      return {
      }
    },
    computed: {
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
  @import "home.scss";
  @import "media.scss";
  @import "font.scss";
</style>
