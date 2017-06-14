<template>
  <div class='Blogs'>
    <art v-for = "data in datas" :data = data :tags= data.tags size = 'art-item' :key='data._id'></art>
  </div>
</template>
<script>
  export default {
    name: 'Blogs',
    data () {
      return {
      }
    },
    computed: {
      datas () {
        return this.$store.state.blog
      }
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .Blogs{
    min-height: calc(100vh - 325px);
  }
</style>
