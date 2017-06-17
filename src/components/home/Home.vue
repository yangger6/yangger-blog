<template>
  <div class='Home'>
    <div class="Home-con">
      <div class="title">
        <h1>
          <div></div>
          <span>YANGGER</span>
          <div></div>
        </h1>
        <div class="btn">
          <router-link to="/posts"><span>VIEW THIS BLOG</span></router-link>
        </div>
      </div>
    </div>
    <video src="/static/home.mp4" autoplay="autoplay"></video>
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
</style>
