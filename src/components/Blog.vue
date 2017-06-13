<template>
  <div class='Home'>
    <art :data="data" size = 'art-context'></art>
  </div>
</template>
<script>
  export default {
    name: 'Blog',
    data () {
      return {
      }
    },
    computed: {
      data () {
        return this.$store.state.blog[this.$store.state.selectIndex]
      }
    },
    mounted () {
    }
  }
</script>
<style scoped>
</style>
