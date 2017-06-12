<template>
  <div class="art-item" v-if="size === 'art-item'">
    <header>
      <h2>{{data.title}}</h2>
    </header>
    <section>
      <p>
        {{data.body}}
        <a href="">»</a>
      </p>
    </section>
    <footer>
      <a href="">{{data.author}}</a>
      on
      <a v-for="tag in tags" class="tags" href="">{{tag}} <icon name="tag"></icon> </a>
      <a href="" class="meta">{{data.meta.votes}} <icon name="thumbs-o-up"></icon> </a>
      <a href="" class="meta">{{data.meta.fav}} <icon name="heart-o"></icon></a>
      <time>{{data.date}}</time>
    </footer>
  </div>
</template>
<script>
  export default {
    name: 'article',
    props: {
      size: String, // 区别渲染 item 还是 文章
      data: Object,
      tags: Array // 文章的类型
    },
    data () {
      return {
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
  @import "./art";
</style>
