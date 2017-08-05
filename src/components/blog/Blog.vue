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
        'getBlog'
      ]),
      async fetchData () {
        this.getBlog()
      }
    },
    computed: {
      ...mapGetters({
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
