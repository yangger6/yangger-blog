<template>
  <div id="app">
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
    </header>
    <main class="content">
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
      imgSrc: '/static/head.png'
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
  @import "/components/gobal";
</style>
<style scoped rel="stylesheet/scss" lang="scss">
  #app{
    min-height: 100%;
  }
  header{
    border-bottom: 1px solid #eee;
    padding: 5px 10px;
    position: relative;
    background: rgba(0,0,0,.1);
    img{
      float: right;
    }
  }
  main{
  }
</style>
