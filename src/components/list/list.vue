<template>
  <ul :class="size">
    <slot></slot>
  </ul>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "list";
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
