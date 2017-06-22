<template>
  <div class="login">
    <img src="/static/login.png" alt="Login" width="400" height="500">
    <input type="text" @blur="schemaUser" :class="{error: !trueUser}" v-model="userName">
    <input type="password" class="password" @blur="schemaPwd" :class="{error: !truePwd}" v-model="password">
    <button @click="login"></button>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
@import "login.scss";
</style>
<script>
  import posts from '../../../post/post'
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
      schemaUser () {
        this.trueUser = this.userName.replace(/(^\s+)|(\s+$)/g, '') !== ''
      },
      schemaPwd () {
        this.truePwd = this.password.replace(/(^\s+)|(\s+$)/g, '') !== ''
      },
      async login () {
        let result = await posts.userLogin(this, {
          userName: this.userName,
          password: this.password
        })
        if (result.msg === 'success') {
          this.$store.commit('updateUser', result.data)
          console.log(`Login is ${result.msg}`)
          this.$router.push({name: 'Editor'})
        } else {
          if (result.data) {
            console.log(`Login error is :${result.data}`)
          } else {
            result.map(err => console.log(err.errorMessage))
          }
        }
      }
    }
  }
</script>
