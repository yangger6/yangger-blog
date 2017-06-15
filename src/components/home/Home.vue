<template>
  <div class='Home'>
    <v-canvas></v-canvas>
    <art v-for = "(data, index) in datas" :data = data :tags= data.tags size = 'art-item' :key='data._id' :id='data._id' :index="index"></art>
  </div>
</template>
<script>
  import canvas from './../canvas/canvas.vue'
  export default {
    name: 'Home',
    data () {
      return {
      }
    },
    components: {
      'v-canvas': canvas
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
