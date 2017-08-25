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
      <a v-for="tag in tags" class="tags" href="#">{{tag}} <icon name="tag"></icon> </a>
      <a class="meta">{{blog.meta.votes}}<meta-icon meta='votes' :index="index"></meta-icon></a>
      <a class="meta">{{blog.meta.favs}}<meta-icon meta='favs' :index="index"></meta-icon></a>
      <time>{{blog.date.match(/[0-9]+[-][0-9]+[-][0-9]+/)[0]}}</time>
    </footer>
  </div>
  <div class="art-context markdown" v-else>
    <div class="bg-line" :style="{ height: headerHeight }"></div>
    <header ref="header">
      <h1>{{blog && blog.title}}</h1>
      <div class="art-author">
        <a class="avatar-push">
          <img src="/static/head.png" alt="" width="20" height="20">
        </a>
        <router-link to='/about' class="author-link">{{blog&& blog.author}}</router-link>
        <span>|</span>
        <router-link to='/posts' class="author-link">{{blog&& blog.author}}'s Posts</router-link>
        <span>|</span>
        Tags:
        <a v-for="tag in blog.tags" href="#" class="author-link tag">{{tag}}</a>
      </div>
      <div class="art-meta">
        <div class="meta-line">
          <time class="date-block">{{blog && blog.date.match(/[0-9]+[-][0-9]+[-][0-9]+/)[0]}}</time>
        </div>
      </div>
    </header>
    <div v-html="html" class="context"></div>
    <footer>
      <div class="stats">
        <!--<span class="single-stat">0</span>-->
        <span class="single-stat">{{blog.meta.votes}}<meta-icon meta='votes' :index="index"></meta-icon></span>
        <span class="single-stat">{{blog.meta.favs}}<meta-icon meta='favs' :index="index"></meta-icon></span>
      </div>
    </footer>
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
      id: Number    // 文章的id
    },
    data () {
      return {
        headerHeight: '0px'
      }
    },
    mounted () {
      this.headerHeight = (this.$refs.header.offsetHeight + 150) + 'px'
    },
    computed: {
      html () {
        if (this.blog) return this.blog.markdown
      }
    },
    methods: {
      ...mapActions([
        'changeBlogIndexById'
      ]),
    /**
     * 设置选中的文章序号 再路由
     */
      route () {
        this.changeBlogIndexById(this.id)
        this.$router.push({name: 'Blog', params: {blogId: this.id}})
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style rel="stylesheet/scss" lang="scss">
  @import "art.scss";
  @import '../markdown/markdown.scss';
  @import "media.scss";
</style>
