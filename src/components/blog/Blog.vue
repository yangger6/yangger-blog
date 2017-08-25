<template>
  <div class='Blog'>
    <article>
      <p v-if="isLoading">Loading...</p>
      <art v-if="!isLoading" :blog="newBlog" size = 'art-context'></art>
    </article>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'Blog',
    data () {
      return {
        newBlog: false,
        isLoading: true
      }
    },
    async created () {
      await this.fetchData()
    },
    methods: {
      ...mapActions([
        'getBlog',
        'changeBlogIndexById'
      ]),
      async fetchData () {
        const blogId = this.$route.params.blogId || 0
        if (this.blogs.length === 0) {
          this.newBlog = await this.getBlog(blogId)
        }
        await this.changeBlogIndexById(blogId)
        this.newBlog = await this.getBlog(blogId)
        this.isLoading = false
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
    background: #1e1e1e;
  }
  article{
    width: 90%;
    max-width: 810px;
    margin: 4rem auto;
    padding-bottom: 4rem;
    word-wrap: break-word;
  }
</style>
