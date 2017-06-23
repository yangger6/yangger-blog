<template>
  <icon :name="meta" v-if="meta === 'thumbs-o-up'" @click='vote'></icon>
  <icon :name="meta" v-else-if="meta === 'heart-o'"></icon>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
</style>
<script>
  export default{
    data () {
      return {
        msg: 'meta'
      }
    },
    props: {
      meta: String
    },
    methods: {
      vote () {
        debugger
      }
    }
  }
</script>
