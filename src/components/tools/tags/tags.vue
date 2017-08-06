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
  import { mapActions } from 'vuex'
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
      ...mapActions([
        'addAdminBlogTag',
        'removeAdminBlogTag'
      ]),
      async remove (index) {
        await this.removeAdminBlogTag(index)
      },
      async addTag () {
        await this.addAdminBlogTag(this.tag)
        this.tag = ''
      }
    }
  }
</script>
