<template>
  <div class='Blogs'>
    <art v-for = "(blog, index) in blogs" :blog = blog :tags= blog.tags size = 'art-item' :key='blog._id' :id='blog.blogId' :index="index"></art>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'Blogs',
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
        blogs: 'blogs'
      })
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .Blogs{
    min-height: calc(100vh - 130px);
    padding-top: 10px;
  }
</style>
