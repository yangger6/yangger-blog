<template>
  <img :src="src" alt="">
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  div{
    width: inherit;
    height: inherit;
  }
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
