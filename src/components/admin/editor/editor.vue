<template>
  <section class="editor">
    <header v-if="type === 'Editor'">
      <h2>
        <input type="text" placeholder="Your Post Name">
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
    <header v-else-if="type === 'Context'">
      <h2>
        Context
      </h2>
      <section class="btn">
        <button style="border-radius: 3px;" @click="childChangeIndex(0)">New Post</button>
      </section>
    </header>
    <section class="editor-box" :class="{Context: type === 'Context'}">
      <section v-if="type === 'Editor'">
        <textarea name=""cols="30" rows="10"></textarea>
      </section>
      <section v-else-if="type === 'Context'">
        <ul>
          <li v-for="(item, index) in items">
            <a :class="{selected: itemIndex === index}" @click="changeItemIndex(index)">
              <h3>{{item.title}}</h3>
              <p>{{item.date}}</p>
            </a>
          </li>
        </ul>
      </section>
      <section>
      </section>
    </section>
  </section>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "editor";
</style>
<script>
  export default{
    data () {
      return {
        controlShow: false,
        controlIndex: 0,
        controlItems: ['Publish Now', 'Save Draft'],
        itemIndex: 0,
        items: [{title: '123', date: '2017-6-19'}, {title: '1asd23', date: '2017-6-19'}]
      }
    },
    computed: {
      controlText () {
        return this.controlItems[this.controlIndex]
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
      }
    },
    props: {
      type: String  //  通过传入type切换
    }
  }
</script>
