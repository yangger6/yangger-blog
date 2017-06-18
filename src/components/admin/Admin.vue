<template>
  <div class="Admin">
    <div v-if="isLogin" class="admin">
      <nav class="admin-nav">
        <header>
          <div class="admin-head">
            <img src="/static/head.png" alt="">
          </div>
          <div class="admin-details">
            <div>Blogs</div>
            <div>Yangger</div>
          </div>
        </header>
        <main>
          <ul v-for="(item, index) in items">
            <li><a @click="changeItem(index)" :class="{selected: index === selectIndex}"><icon :name="item.i"></icon>{{item.v}}</a></li>
          </ul>
        </main>
        <footer>
          <icon name="arrow-left"></icon>
          <p><router-link to="/">VIEW BLOGS</router-link></p>
        </footer>
      </nav>
      <main class="editor">
        <editor></editor>
      </main>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "admin";
</style>
<script>
  import editor from './editor/editor.vue'
  export default{
    data () {
      return {
        selectIndex: -1,
        items: [
          {i: 'pencil', v: 'New Post'},
          {i: 'file-text', v: 'Context'}
        ]
      }
    },
    methods: {
      changeItem (index) {
        this.selectIndex = index
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
    },
    components: {
      editor
    }
  }
</script>
