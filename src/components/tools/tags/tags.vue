<template>
  <list>
    Tags: <li v-for="(tag, index) in tags"><a @click="remove(index)">{{tag}}</a></li>
    <input type="text" placeholder="Type Here" @keyup.enter="addTag" v-model="tag">
  </list>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "tags.scss";
</style>
<script>
  export default{
    data () {
      return {
        msg: 'Tags',
        tag: ''
      }
    },
    props: {
      tags: Array
    },
    methods: {
      remove (index) {
        this.$store.commit('removeAdminBlogTag', index)
      },
      addTag () {
        this.$store.commit('addAdminBlogTag', this.tag)
        this.tag = ''
      }
    }
  }
</script>
