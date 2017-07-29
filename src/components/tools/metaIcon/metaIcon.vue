<template>
  <a v-if="meta === 'votes'"  @click='changeMeta'><icon :name="name"></icon></a>
  <a v-else-if="meta === 'favs'" @click='changeMeta'><icon :name="name" ></icon></a>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "metaIcon.scss";
</style>
<script>
  import posts from '../../../post/post'
  export default{
    data () {
      return {
        msg: 'meta',
        metas: {
          'votes': {
            true: 'thumbs-up',
            false: 'thumbs-o-up'
          },
          'favs': {
            true: 'heart',
            false: 'heart-o'
          }
        },
        isClick: false
      }
    },
    props: {
      meta: String,
      index: Number
    },
    methods: {
      changeMeta () {
        let opt = 1
        if (this.isClick) opt = -1
        this.$store.commit('changeBlogMeta', {
          index: this.index,
          meta: this.meta,
          opt: opt
        })
        this.isClick = !this.isClick
        posts.updateBlog(this, this.$store.state.blog[this.index])
      }
    },
    computed: {
      name () {
        return this.metas[this.meta][this.isClick]
      }
    }
  }
</script>
