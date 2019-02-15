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
          <list v-show="controlShow">
            <li v-for="(item, index) in controlItems"><a @click="changeControl(index)">{{item}}</a></li>
            <li class="line"></li>
            <li><a @click="control">Delect Post</a></li>
          </list>
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
        <tags :tags="editBlog.tags"></tags>
        <textarea name=""cols="30" rows="10" :value="this.adminBlog.body" @keyup="toHTML"></textarea>
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
      <section class="markdown">
        <div v-if="type === 'Editor'" v-html="this.adminBlog.markdown" class="markdown" style="padding-top: 50px;box-sizing: border-box;">
        </div>
        <div v-else v-html="this.blog[this.blogSelectIndex].markdown">
        </div>
        <a @click="editing" v-show="type === 'Content'" ><icon  name="edit"></icon></a>
      </section>
    </section>
  </section>
</template>
<style rel="stylesheet/scss" lang="scss">
  @import "editor.scss";
  @import "../../tools/markdown/markdown.scss";
</style>
<script>
  import tags from '../../tools/tags/tags.vue'
  import { mapGetters, mapActions } from 'vuex'
  const md = require('markdown-it')()
  export default{
    data () {
      return {
        controlShow: false,
        controlIndex: 0,
        itemIndex: 0,
        editMarkdown: ''
      }
    },
    components: {
      tags
    },
    computed: {
      ...mapGetters({
        blog: 'blogs',
        blogSelectIndex: 'blogSelectIndex',
        adminItems: 'adminItems',
        adminSelectIndex: 'adminSelectIndex',
        adminBlog: 'adminBlog',
        user: 'user'
      }),
      controlItems () {
        if (this.$parent.itemIndex === 0) {
          return ['Publish Now', 'Save Draft']
        } else if (!this.blog[this.blogSelectIndex].hidden) {
          return ['Update Post', 'Unpublish']
        } else {
          return ['Publish Now', 'Save Draft']
        }
      },
      controlText () {
        return this.controlItems[this.controlIndex]
      },
      items () {
        return this.blog
      },
      type () {
        return this.adminItems[this.adminSelectIndex].type
      },
      editBlog () { // 编辑博客
        return this.adminBlog
      }
    },
    methods: {
      ...mapActions([
        'changeBlogIndex',
        'changeAdminBlog',
        'changeAdminIndex',
        'addBlog',
        'updateBlog',
        'removeBlog'
      ]),
      changeControl (index) {
        this.controlIndex = index
        this.controlShow = false
      },
      changeItemIndex (index) {
        this.itemIndex = index
        this.changeBlogIndex(index)
      },
      async editing () {
        let blog = this.blog[this.blogSelectIndex]
        await this.changeAdminBlog({
          title: blog.title,
          body: blog.body,
          markdown: blog.markdown,
          tags: blog.tags
        })
        this.editMarkdown = md.render(blog.body)
        this.changeAdminIndex(0)
      },
      async toHTML (e) {
        let Md = md.render(e.target.value)
        await this.changeAdminBlog({
          title: document.getElementById('blogTitle').value,
          body: e.target.value,
          tags: this.editBlog.tags,
          markdown: Md
        })
      },
      async control (e) {
        let con = e.target.innerHTML
        let blog = {
          title: this.editBlog.title,
          author: '',
          body: this.editBlog.body,
          markdown: this.editBlog.markdown,
          comments: [],
          hidden: false,
          tags: this.editBlog.tags,
          meta: {
            votes: 0,
            favs: 0
          }
        }
        var result = null
        if (con === 'Publish Now') {  //  推送文章或者将草稿修改為推送文章
          blog.author = this.user.userName
          blog.hidden = false
          if (this.$parent.itemIndex === 1) { // 將草稿推送到展示
            blog._id = this.blog[this.blogSelectIndex]._id
            result = await this.updateBlog(blog)
          } else {  //  第一次編輯文章并且推送
            result = await this.addBlog(blog)
            if (result) this.$parent.itemIndex = 1
          }
          console.log(`Publish Now is ${result}`)
        //          分割线
        } else if (con === 'Save Draft') {  // 保存为草稿
          if (this.$parent.itemIndex === 1) { // 保存草稿
            blog.author = 'Draft'
            blog.hidden = true
            blog._id = this.blog[this.blogSelectIndex]._id
            result = await this.updateBlog(blog)
          } else {
            blog.author = 'Draft'
            blog.hidden = true
            result = await this.addBlog(blog)
            if (result) this.$parent.itemIndex = 1
          }
          console.log(`Save Draft is ${result}`)
          //          分割线
        } else if (con === 'Update Post') {
          blog.author = this.user.userName
          blog.hidden = false
          blog._id = this.blog[this.blogSelectIndex]._id
          result = await this.updateBlog(blog)
          if (result) this.$parent.itemIndex = 1
          console.log(`Update Post is ${result}`)
          //          分割线
        } else if (con === 'Unpublish') {
          blog.author = 'Draft'
          blog.hidden = true
          blog._id = this.blog[this.blogSelectIndex]._id
          result = await this.updateBlog(blog)
          console.log(`Unpublish is ${result}`)
          //          分割线
        } else if (con === 'Delect Post') {
          blog._id = this.blog[this.blogSelectIndex]._id
          const result = await this.removeBlog({
            id: blog._id,
            index: this.blogSelectIndex
          })
          if (result) {
            await this.changeAdminIndex(1)
            this.$router.push({name: 'Editor', query: {type: 'Content'}})
          }
          console.log(`Delect Post is ${result}`)
        }
        this.controlShow = false
      }
    }
  }
</script>
