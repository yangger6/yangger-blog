<template>
  <section class="editor">
    <header v-if="type === 'Editor'">
      <h2>
        <input type="text" placeholder="Your Post Name" :value="editBlog.title">
      </h2>
      <section class="btn">
        <button>{{controlText}}</button>
        <button @click="controlShow = !controlShow"><icon name="sort-down"></icon></button>
        <div class="dropdown">
          <ul v-show="controlShow">
            <li v-for="(item, index) in controlItems"><a @click="changeControl(index)">{{item}}</a></li>
            <li class="line"></li>
            <li><a>Delect Post</a></li>
          </ul>
        </div>
      </section>
    </header>
    <header v-else-if="type === 'Content'">
      <h2>
        Content
      </h2>
      <section class="btn">
        <button style="border-radius: 3px;" @click="childChangeIndex(0)">New Post</button>
      </section>
    </header>
    <section class="editor-box" :class="{Content: type === 'Content'}">
      <section v-if="type === 'Editor'">
        <textarea name=""cols="30" rows="10">{{editBlog.body}}</textarea>
      </section>
      <section v-else-if="type === 'Content'">
        <ul>
          <li v-for="(item, index) in items">
            <a :class="{selected: itemIndex === index}" @click="changeItemIndex(index)">
              <h3>{{item.title}}</h3>
              <p>{{item.date.match(/[0-9]+-[0-9]+-[0-9]+/)[0]}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section>
        <div v-if="type === 'Editor'" v-html="editBlog.markdown">
        </div>
        <div v-else v-html=markdown>
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
//  import {markdown} from 'markdown'
  export default{
    data () {
      return {
        controlShow: false,
        controlIndex: 0,
        controlItems: ['Publish Now', 'Save Draft'],
        itemIndex: 0,
        editBlog: { // 编辑博客
          title: '',
          body: '',
          markdown: ''
        }
      }
    },
    computed: {
      controlText () {
        return this.controlItems[this.controlIndex]
      },
      items () {
        return this.$store.state.blog
      },
      markdown () {
        return this.$store.state.blog[this.$store.state.selectIndex].markdown
      }
    },
    methods: {
      changeControl (index) {
        this.controlIndex = index
        this.controlShow = false
      },
      /**
       *
       * @param index 修改父组件的Selectindex
       */
      childChangeIndex (index) {
        this.$emit('childChangeIndex', index)
      },
      changeItemIndex (index) {
        this.itemIndex = index
        this.$store.commit('changBlogIndex', index)
      },
      editing () {
        let blog = this.$store.state.blog[this.$store.state.selectIndex]
        if (!blog.hidden) { //  是否已经发布了
          this.controlItems = ['Update Post', 'Publish Now']
        } else {
          this.controlItems = ['Publish Now', 'SaveDraft']
        }
        this.editBlog.title = blog.title
        this.editBlog.body = blog.body
        this.editBlog.markdown = blog.markdown
        this.$emit('childChangeIndex', 0)
      }
    },
    props: {
      type: String  //  通过传入type切换
    }
  }
</script>
