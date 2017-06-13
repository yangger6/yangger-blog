<template>
  <div class='Home'>
    <art v-for = "data in datas" :data = data :tags= data.tags size = 'art-item'></art>
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
<style scoped>
</style>
