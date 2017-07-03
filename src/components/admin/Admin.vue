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
            <li><a @click="changeItem(index)" :class="{selected: index === itemIndex}"><icon :name="item.i"></icon>{{item.v}}</a></li>
          </ul>
        </main>
        <footer>
          <icon name="arrow-left"></icon>
          <p><router-link to="/">VIEW BLOGS</router-link></p>
        </footer>
      </nav>
      <main class="editor">
        <router-view></router-view>
      </main>
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
        items: this.$store.state.admin.items,
        itemIndex: 0
      }
    },
    methods: {
      changeItem (index) {
        debugger
        this.itemIndex = index
        this.$store.commit('changAdminIndex', index)
        this.$store.commit('changAdminBlog', {
          title: '',
          body: '',
          markdown: '',
          tags: []
        })
        this.$router.push({name: 'Editor', query: {type: this.type}})
      }
    },
    computed: {
      selectIndex () {
        return this.$store.state.admin.selectIndex
      },
      isLogin () {
        return this.$store.state.user.name !== ''
      },
      type () {
        return this.$store.state.admin.items[this.$store.state.admin.selectIndex].type
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
