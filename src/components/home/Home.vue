<template>
  <div class='Home'>
    <art v-for = "(data, index) in datas" :data = data :tags= data.tags size = 'art-item' :key='data._id' :id='data._id' :index="index"></art>
  </div>
</template>
<script>
  export default {
    name: 'Home',
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
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/scss" lang="scss">
  .Home{
    margin-top: calc(100vh - 70px);
  }
</style>
