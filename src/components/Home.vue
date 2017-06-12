<template>
  <div class='Home'>
    <v-canvas></v-canvas>
    <art v-for = "data in datas" :data = data :tags= data.tags size = 'art-item'></art>
  </div>
</template>
<script>
  import canvas from './canvas/canvas.vue'
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
<style scoped>
  .Home{
  }
</style>
