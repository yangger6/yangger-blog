<template>
  <div class='Blog'>
    <article>
      <art :blog="blog" size = 'art-context'></art>
    </article>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Blog',
    data () {
      return {
      }
    },
    async created () {
      await this.fetchData()
    },
    methods: {
      ...mapActions([
        'getBlog',
        'changeBlogIndex',
        'changeBlogIndexById'
      ]),
      async fetchData () {
//        const blogId = this.$route.params.index || 0
//        var blogIndex = null
//        this.blogs.map(({postId}, i) => {
//          if (postId === Number(blogId)) {
//            blogIndex = i
//          }
//        })
//        await this.changeBlogIndex(blogIndex)
//        await this.getBlog(blogId)
        const blogId = this.$route.params.index || 0
        await this.changeBlogIndexById(blogId)
        await this.getBlog(blogId)
      }
    },
    computed: {
      ...mapGetters({
        blogs: 'blogs',
        blog: 'selectBlog'
      })
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .Blog {
    padding-top: 50px;
  }
  article{
    position: relative;
    width: 80%;
    max-width: 710px;
    margin: 4rem auto;
    padding-bottom: 4rem;
    border-bottom: #EBF2F6 1px solid;
    word-wrap: break-word;
  }
</style>
