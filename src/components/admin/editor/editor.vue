<template>
  <section class="new-Post">
    <header>
      <h2>
        <button></button>
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
    <section>
      <textarea name="" id="" cols="30" rows="10"></textarea>
    </section>
    <section></section>
  </section>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "editor";
</style>
<script>
  export default{
    data () {
      return {
        msg: 'Hello',
        controlShow: false,
        controlIndex: 0,
        controlItems: ['Publish Now', 'Save Draft']
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
      }
    }
  }
</script>
