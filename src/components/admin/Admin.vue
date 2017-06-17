<template>
  <div v-if="isLogin">

  </div>
  <div v-else>
    <router-view></router-view>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
</style>
<script>
  export default{
    data () {
      return {
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.user.name !== ''
      }
    },
    created () {
      if (!this.isLogin) {
        this.$router.push({name: 'Login'})
      }
    }
  }
</script>
