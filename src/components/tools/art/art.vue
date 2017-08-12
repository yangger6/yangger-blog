<template>
  <div class="art-item" v-if="size === 'art-item'">
    <header>
      <h2 @click="route">{{blog.title}}</h2>
    </header>
    <section>
      <p>
        {{blog.body.substring(0,80)}}
        <a @click="route">»</a>
      </p>
    </section>
    <footer>
      <a href="">{{blog.author}}</a>
      on
      <a v-for="tag in tags" class="tags" href="">{{tag}} <icon name="tag"></icon> </a>
      <a class="meta">{{blog.meta.votes}}<meta-icon meta='votes' :index="index"></meta-icon></a>
      <a class="meta">{{blog.meta.favs}}<meta-icon meta='favs' :index="index"></meta-icon></a>
      <time>{{blog.date.match(/[0-9]+[-][0-9]+[-][0-9]+/)[0]}}</time>
    </footer>
  </div>
  <div class="art-context markdown" v-else>
    <header>
      <h2 class="art-title">{{blog.title}}</h2>
    </header>
    <div v-html="html"></div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'article',
    props: {
      size: String, // 区别渲染 item 还是 文章
      blog: Object,
      tags: Array,  // 文章的类型
      index: Number,  //  文章的序号
      id: String    // 文章的id
    },
    data () {
      return {
      }
    },
    computed: {
      html () {
        return this.blog.markdown
      }
    },
    methods: {
      ...mapActions([
        'changeBlogIndex'
      ]),
    /**
     * 设置选中的文章序号 再路由
     */
      route () {
        this.changeBlogIndex(this.index)
        this.$router.push({name: 'Blog', params: {index: this.index}})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  @import "art.scss";
  @import '../markdown/markdown.scss';
</style>
