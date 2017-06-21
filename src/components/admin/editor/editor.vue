<template>
  <section class="editor">
    <header v-if="type === 'Editor'">
      <h2>
        <input type="text" placeholder="Your Post Name" :value="editBlog.title" id="blogTitle">
      </h2>
      <section class="btn">
        <button @click="control">{{controlText}}</button>
        <button @click="controlShow = !controlShow"><icon name="sort-down"></icon></button>
        <div class="dropdown">
          <ul v-show="controlShow">
            <li v-for="(item, index) in controlItems"><a @click="changeControl(index)">{{item}}</a></li>
            <li class="line"></li>
            <li><a @click="control">Delect Post</a></li>
          </ul>
        </div>
      </section>
    </header>
    <header v-else-if="type === 'Content'">
      <h2>
        Content
      </h2>
      <section class="btn">
        <button style="border-radius: 3px;" @click="changeType('Editor')">New Post</button>
      </section>
    </header>
    <section class="editor-box" :class="{Content: type === 'Content'}">
      <section v-if="type === 'Editor'">
        <div>
          123
        </div>
        <textarea name=""cols="30" rows="10" :value="this.$store.state.admin.blog.body" @keyup="toHTML"></textarea>
      </section>
      <section v-else-if="type === 'Content'">
        <ul>
          <li v-for="(item, index) in items">
            <a :class="{selected: itemIndex === index}" @click="changeItemIndex(index)">
              <h3>{{item.title}}</h3>
              <p><span>{{item.author}}</span>{{item.date.match(/[0-9]+-[0-9]+-[0-9]+/)[0]}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section>
        <div v-if="type === 'Editor'" v-html="this.$store.state.admin.blog.markdown" class="markdown">
        </div>
        <div v-else v-html=seeMarkdown class="markdown">
        </div>
        <a @click="editing" v-show="type === 'Content'" ><icon  name="edit"></icon></a>
      </section>
    </section>
  </section>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "editor";
</style>
<script>
  import {markdown} from 'markdown'
  import posts from '../../../post/post' // 数据库取数据
  export default{
    data () {
      return {
        controlShow: false,
        controlIndex: 0,
        itemIndex: 0,
        editMarkdown: ''
      }
    },
    computed: {
      controlItems () {
        if (this.editBlog.title === '' && this.editBlog.body === '') {
          return ['Publish Now', 'Save Draft']
        } else if (!this.$store.state.blog[this.$store.state.selectIndex].hidden) {
          return ['Update Post', 'Publish Now']
        } else {
          return ['Publish Now', 'SaveDraft']
        }
      },
      controlText () {
        return this.controlItems[this.controlIndex]
      },
      items () {
        return this.$store.state.blog
      },
      type () {
        return this.$store.state.admin.items[this.$store.state.admin.selectIndex].type
      },
      seeMarkdown () {
        return this.$store.state.blog[this.$store.state.selectIndex].markdown
      },
      editBlog () { // 编辑博客
        return this.$store.state.admin.blog
      }
    },
    methods: {
      changeControl (index) {
        this.controlIndex = index
        this.controlShow = false
      },
      changeItemIndex (index) {
        this.itemIndex = index
        this.$store.commit('changBlogIndex', index)
      },
      editing () {
        let blog = this.$store.state.blog[this.$store.state.selectIndex]
        this.$store.commit('changAdminBlog', {
          title: blog.title,
          body: blog.body,
          markdown: blog.markdown
        })
        this.editMarkdown = markdown.toHTML(blog.body)
        this.$store.commit('changAdminIndex', 0)
      },
      toHTML (e) {
        let Md = markdown.toHTML(e.target.value)
        this.$store.commit('changAdminBlog', {
          title: document.getElementById('blogTitle').value,
          body: e.target.value,
          markdown: Md
        })
      },
      control (e) {
        let con = e.target.innerHTML
        let blog = {
          title: this.editBlog.title,
          author: '',
          body: this.editBlog.body,
          markdown: this.editBlog.markdown,
          comments: [],
          hidden: false,
          tags: ['Javascript', 'CSS3'],
          meta: {
            votes: 55,
            favs: 11223
          }
        }
        if (con === 'Publish Now') {
          blog.author = this.$store.state.user.name
          blog.hidden = false
          posts.addBlog(this, blog)
        } else if (con === 'Save Draft') {
          blog.author = 'Draft'
          blog.hidden = true
          posts.addBlog(this, blog)
        }
        this.controlShow = false
      }
    }
  }
</script>
