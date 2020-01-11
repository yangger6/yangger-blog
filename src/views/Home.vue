<template lang="pug">
    .home.container
        the-menu
        .move-box(ref='box' :style="{width: blogList.length * 100 + '%'}")
            v-blog-page(
            :ref="'blogPage' + blog.id"
            v-for="(blog, index) in blogList"
            :key="index" :blog="blog"
            :style="{left: index * 73 + '%'}"
            :index="getIndex(index)",
            @click.native="changeSelectBlog(blog.currentId || blog.id, index)"
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
  @profileModule.State('openPage') openPage!: boolean;
  @profileModule.Mutation(BLOGID_CHANGE) updateBlogId!: (blogId: number) => void;
  @profileModule.Mutation(THEME_CHANGE) updateTheme!: (theme: ITheme) => void;
  blogList: IBlogItem[] = [];
  currentIndex: number = 0;
  isAnimation: boolean = false; // 是否开始动画
  timer: any = null;
  loading: boolean = false;
  async created() {
    try {
      this.loading = true;
      const {data} = await IBlog.get();
      const {id, theme} = data[0];
      this.updateBlogId(id);
      this.updateTheme(theme);
      const copyBlog: IBlogItem = JSON.parse(JSON.stringify(data[0]));
      copyBlog.currentId = copyBlog.id;
      copyBlog.id = -1;
      const copyBlog1: IBlogItem = JSON.parse(JSON.stringify(data[1]));
      copyBlog1.currentId = copyBlog1.id;
      copyBlog1.id = -2;
      this.blogList = [...data, copyBlog, copyBlog1];
      this.$nextTick(() => {
          const selectBlogId = Number(this.$route.params.id);
          if (selectBlogId) {
              const selectBlogIndex = this.blogList.findIndex((blog) => blog.id === selectBlogId);
              this.changeSelectBlog(selectBlogId, selectBlogIndex);
              let vn: any = this.$refs[`blogPage${selectBlogId}`];
              vn = vn && vn[0];
              vn.openPageHandle();
          }
      });
    } catch (e) {
      console.log(e);
    } finally {
        this.loading = false;
    }
  }
  getIndex(index: number) {
    const BLOG_LENGTH = this.blogList.length;
    // TODO 短时间应该写不到99条Blog 或者改成只取10条
    const numberHelper = (num: number) => ('0' + num).slice(-2);
    return index + 2 >= BLOG_LENGTH ? numberHelper(BLOG_LENGTH - index - 1) : numberHelper(index + 1);
  }
  changeSelectBlog(blogId: number, index: number) {
    if (this.currentIndex !== index && !this.openPage) {
      this.currentIndex = index;
      this.updateBlogId(blogId);
      this.movingPage(index);
    }
  }
  movingPage(index: number, time: number = 1000) {
    const box: HTMLElement = this.$refs.box as any;
    if (!this.isAnimation) {
      let reFresh = false;
      if (index + 2 === this.blogList.length) {
        reFresh = true;
      }
      const stepLength = 73;
      let startX = (index - 1) * stepLength;
      const endX = index * stepLength;
      const LOOP = () => {
        const MOVE_X =  73 / (time / 60);
        startX += MOVE_X;
        box.style.left = `-${Math.min(startX, endX)}%`;
        if (startX > endX) {
          if (reFresh) {
            setTimeout(() => box.style.left = '0%', 0);
          }
          return window.cancelAnimationFrame(this.timer);
        }
        this.timer = requestAnimationFrame(() => {
          LOOP();
        });
      };
      LOOP();
    }
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
