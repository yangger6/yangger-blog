<template>
  <div class='Blog'>
    <article>
      <art :data="data" size = 'art-context'></art>
    </article>
  </div>
</template>
<script>
  import posts from '../../post/post'
  export default {
    name: 'Blog',
    data () {
      return {
      }
    },
    methods: {
      async fetchData () {
        let that = this
        let id = this.$store.state.blog[this.$store.state.selectIndex]._id
        let result = await posts.getBlog(that, id)
        this.$store.commit('updateBlog', result)
      }
    },
    computed: {
      data () {
        this.fetchData()
        return this.$store.state.blog[this.$store.state.selectIndex]
      }
    },
    mounted () {
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .Blog {
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
