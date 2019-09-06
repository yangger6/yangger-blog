<template lang="pug">
    .home.container
        the-menu
        .move-box(:style="moveStyle")
            v-blog-page(
            v-for="(blog, index) in blogList"
            :key="blog.index" :blog="blog"
            @click.native="changeSelectBlog(blog.id, index)"
            :style="{left: index * 73 + '%'}"
            @updateTheme="updateTheme")
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import VBlogPage from '@/components/views/VBlogPage.vue';
import TheMenu from '@/components/single/TheMenu.vue';
import IBlog, {IBlogItem} from '../interface/IServices/IBlog';
import {namespace} from 'vuex-class';
import {BLOGID_CHANGE, ITheme, THEME_CHANGE} from '../store/profile/types';
const profileModule = namespace('profile');

@Component({
    components: {TheMenu, VBlogPage},
})
export default class Home extends Vue {
  @profileModule.Mutation(BLOGID_CHANGE) updateBlogId!: (blogId: number) => void;
  @profileModule.Mutation(THEME_CHANGE) updateTheme!: (theme: ITheme) => void;
  blogList: IBlogItem[] = [];
  currentIndex: number = 0;
  stopAnimation: boolean = false;
  async created() {
    try {
      const {data} = await IBlog.get();
      this.updateBlogId(data[0].id);
      this.updateTheme(data[0].theme);
      this.blogList = [...data, data[0], data[1]];
    } catch (e) {
      console.log(e);
    }
  }
  changeSelectBlog(blogId: number, index: number) {
    if (this.blogList.length === index + 2) {
      setTimeout(() => {
        this.stopAnimation = true;
        this.currentIndex = 0;
        this.$nextTick(() => {
          this.stopAnimation = false;
        });
      }, 510);
    }
    this.currentIndex = index;
    this.updateBlogId(blogId);
  }
  get moveStyle() {
    return {
      width: this.blogList.length * 100 + '%',
      transform: `translate3d(-${this.currentIndex * 73}%, 0, 0)`,
      transition: this.stopAnimation ? 'none' : 'all .5s ease-in-out',
    };
  }
}
</script>
<style lang="less" scoped>
    .container{
        display: flex;
        flex: 1;
        .move-box {
            position: relative;
            display: flex;
        }
    }
</style>
