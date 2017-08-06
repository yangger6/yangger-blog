<template>
  <div class="login">
    <img src="/static/login.png" alt="Login" width="400" height="500">
    <input type="text" @blur="schemaUser" :class="{error: !trueUser}" v-model="userName">
    <input type="password" class="password" @keyup.enter="login" @blur="schemaPwd" :class="{error: !truePwd}" v-model="password">
    <button @click="login"></button>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
@import "login.scss";
</style>
<script>
  import { mapActions } from 'vuex'
  export default{
    data () {
      return {
        userName: '',
        password: '',
        trueUser: true,
        truePwd: true
      }
    },
    methods: {
      ...mapActions([
        'userLogin'
      ]),
      schemaUser () {
        this.trueUser = this.userName.replace(/(^\s+)|(\s+$)/g, '') !== ''
      },
      schemaPwd () {
        this.truePwd = this.password.replace(/(^\s+)|(\s+$)/g, '') !== ''
      },
      async login () {
        const loginState = await this.userLogin({
          userName: this.userName,
          password: this.password
        })
        if (loginState) this.$router.push({name: 'Editor'})
      }
    }
  }
</script>
