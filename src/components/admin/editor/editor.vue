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
      <section class="markdown">
        <div v-if="type === 'Editor'" v-html="this.$store.state.admin.blog.markdown" class="markdown" style="padding-top: 50px;box-sizing: border-box;">
        </div>
        <div v-else v-html="this.$store.state.blog[this.$store.state.selectIndex].markdown">
        </div>
        <a @click="editing" v-show="type === 'Content'" ><icon  name="edit"></icon></a>
      </section>
    </section>
  </section>
</template>
<style rel="stylesheet/scss" lang="scss">
  @import "editor";
</style>
<script>
  import {markdown} from 'markdown'
  import posts from '../../../post/post' // 数据库取数据
  import tags from '../../tools/tags/tags.vue'
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
      controlItems () {
        if (this.$parent.itemIndex === 0) {
          return ['Publish Now', 'Save Draft']
        } else if (!this.$store.state.blog[this.$store.state.selectIndex].hidden) {
          return ['Update Post', 'Unpublish']
        } else {
          return ['Publish Now', 'Save Draft']
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
          markdown: blog.markdown,
          tags: blog.tags
        })
        this.editMarkdown = markdown.toHTML(blog.body)
        this.$store.commit('changAdminIndex', 0)
      },
      toHTML (e) {
        let Md = markdown.toHTML(e.target.value)
        this.$store.commit('changAdminBlog', {
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
          blog.author = this.$store.state.user.userName
          blog.hidden = false
          if (this.$parent.itemIndex === 1) { // 將草稿推送到展示
            blog._id = this.$store.state.blog[this.$store.state.selectIndex]._id
            result = await posts.updateBlog(this, blog)
            if (result.msg === 'success') {
              this.$store.commit('updateBlog', result.data)
            }
          } else {  //  第一次編輯文章并且推送
            result = await posts.addBlog(this, blog)
            if (result.msg === 'success') {
              this.$store.commit('pushBlog', result.data)
              this.$parent.itemIndex = 1
            }
          }
          console.log(`Publish Now is ${result}`)
        //          分割线
        } else if (con === 'Save Draft') {  // 保存为草稿
          if (this.$parent.itemIndex === 1) { // 保存草稿
            blog.author = 'Draft'
            blog.hidden = true
            blog._id = this.$store.state.blog[this.$store.state.selectIndex]._id
            result = await posts.updateBlog(this, blog)
            if (result.msg === 'success') {
              this.$store.commit('updateBlog', result.data)
            }
          } else {
            blog.author = 'Draft'
            blog.hidden = true
            result = await posts.addBlog(this, blog)
            if (result.msg === 'success') {
              this.$store.commit('pushBlog', result.data)
              this.$parent.itemIndex = 1
            }
          }
          console.log(`Save Draft is ${result}`)
          //          分割线
        } else if (con === 'Update Post') {
          blog.author = this.$store.state.user.name
          blog.hidden = false
          blog._id = this.$store.state.blog[this.$store.state.selectIndex]._id
          const result = await posts.updateBlog(this, blog)
          if (result.msg === 'success') {
            this.$store.commit('updateBlog', result.data)
            this.$parent.itemIndex = 1
          }
          console.log(`Update Post is ${result}`)
          //          分割线
        } else if (con === 'Unpublish') {
          blog.author = 'Draft'
          blog.hidden = true
          blog._id = this.$store.state.blog[this.$store.state.selectIndex]._id
          const result = await posts.updateBlog(this, blog)
          if (result.msg === 'success') {
            this.$store.commit('updateBlog', result.data)
          }
          console.log(`Unpublish is ${result}`)
          //          分割线
        } else if (con === 'Delect Post') {
          let id = {_id: [this.$store.state.blog[this.$store.state.selectIndex]._id]}
          const result = await posts.removeBlog(this, id)
          if (result === 'success') {
            this.$store.commit('removeBlog', this.$store.state.selectIndex)
            this.$router.push({name: 'Editor', query: {type: 'Content'}})
            this.$store.commit('changAdminIndex', 1)
          }
          console.log(`Delect Post is ${result}`)
        }
        this.controlShow = false
      }
    }
  }
</script>
