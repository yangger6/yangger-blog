<template>
  <a v-if="meta === 'votes'"  @click='changeMeta'><icon :name="name"></icon></a>
  <a v-else-if="meta === 'favs'" @click='changeMeta'><icon :name="name" ></icon></a>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "metaIcon.scss";
</style>
<script>
  import { mapActions } from 'vuex'
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
      ...mapActions([
        'changeBlogMeta'
      ]),
      changeMeta () {
        let opt = 1
        if (this.isClick) opt = -1
        this.changeBlogMeta({
          Index: this.index,
          Meta: this.meta,
          Opt: opt
        })
        this.isClick = !this.isClick
      }
    },
    computed: {
      name () {
        return this.metas[this.meta][this.isClick]
      }
    }
  }
</script>
