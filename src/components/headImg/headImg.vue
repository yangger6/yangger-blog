<template>
  <img :src="src" alt="">
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "./headImg";
</style>
<script>
  export default{
    props: {
      src: String
    },
    data () {
      return {
      }
    }
  }
</script>
