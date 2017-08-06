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
  import { mapGetters, mapActions } from 'vuex'
  export default{
    data () {
      return {
        itemIndex: 0
      }
    },
    methods: {
      ...mapActions([
        'changeAdminIndex',
        'changeAdminBlog'
      ]),
      async changeItem (index) {
        this.itemIndex = index
        switch (index) {
          case 0:case 1:
            await this.changeAdminIndex(index)
            await this.changeAdminBlog({
              title: '',
              body: '',
              markdown: '',
              tags: []
            })
            this.$router.push({name: 'Editor', query: {type: this.type}})
            break
          case 2:
            this.$router.push({name: 'Log'})
            break
          default :break
        }
      }
    },
    computed: {
      ...mapGetters({
        items: 'adminItems',
        adminSelectIndex: 'adminSelectIndex',
        user: 'user'
      }),
      isLogin () {
        return this.user.userName !== undefined
      },
      type () {
        return this.items[this.adminSelectIndex].type
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
