<template>
<nav :class="size">
  <slot></slot>
</nav>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "topBar";
</style>
<script>
  export default{
    props: {
      size: String  // 导航栏的大小 dense medium large
    },
    data () {
      return {
      }
    }
  }
</script>
