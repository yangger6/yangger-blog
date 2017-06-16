<template>
  <div class='Blogs'>
    <art v-for = "(data, index) in datas" :data = data :tags= data.tags size = 'art-item' :key='data._id' :id='data._id' :index="index"></art>
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
    min-height: calc(100vh - 130px);
    padding-top: 10px;
  }
</style>
