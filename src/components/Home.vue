<template>
  <div>
    <art></art>
    <art></art>
    <art></art>
    <art></art>
    <v-canvas></v-canvas>
  </div>
</template>
<script>
  import canvas from './canvas/canvas.vue'
  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted () {
      this.$el.style.marginTop = this.$el.children[this.$el.children.length - 1].scrollHeight - 70 + 'px'
    },
    components: {
      'v-canvas': canvas
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  div{
  }
</style>
