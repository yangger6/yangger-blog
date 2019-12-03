<template lang="pug">
    section.v-blog-page(:class="{'open-page': isCurrentOpenBlog}" :style="{'z-index': isCurrentOpenBlog ? '999': ''}")
        header
            .introducer
                p(:style="dominantStyle") {{blog.describe}}
        main
            a.number(:style="dominantStyle")
                | {{index}}
            .mask(@click="openPageHandle")
                img(
                v-for="(img, index) in coverImageList"
                :style="{...currentCoverImageStyle(index)}"
                :class="fadeInOrOutClass(index)",
                :src="img.src"
                :key="img.src"
                :alt="img.alt")
        footer(ref="blogPage")
            .padding-box
                .full-height-page
                    .line
                    p.info
                        span.tags(:style="secondaryStyle")
                            a(v-for='tag in blog.tags' :key="tag") {{tag}}
                    div.title
                        span.date.update-time
                            | {{blog.updateTime | date-format}}
                        h1(:style="dominantStyle") {{blog.title}}
                        .introducer
                            p(:style="dominantStyle") {{blog.describe}}
                        a.view(:style="secondaryStyle" @click="openPageHandle") VIEW MORE
                v-mark-down(:html="blog.body" v-if="isCurrentOpenBlog" ref="article" @loaded="updateImageList")
            v-author-box(:author="blog.author" :headImage="blog.headImage" v-if="isCurrentOpenBlog")
            the-gitalk(v-if="isCurrentOpenBlog")
</template>

<script lang="ts">
  import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
  import {namespace} from 'vuex-class';
  import {ITheme, OPENPAGE_CHANGE} from '@/store/profile/types';
  import {IBlogItem} from '@/interface/IServices/IBlog';
  import VMarkDown from '@/components/views/VMarkDown.vue';
  import TheGitalk from '@/components/single/TheGitalk.vue';
  import {throttle} from '../../utils/decorators/helpful';
  import {ICoverImage} from '../../interface/components/IVMarkDown';
  import {ICoverImageInfo} from '../../interface/components/IVBlogPage';
  import VAuthorBox from '@/components/views/VAuthorBox.vue';
  const profileModule = namespace('profile');

  @Component({
      components: {
          VAuthorBox,
          TheGitalk,
          VMarkDown,
      },
  })
  export default class VBlogPage extends Vue {
    @profileModule.Getter('theme') theme!: ITheme;
    @profileModule.State('openPage') openPage!: boolean;
    @profileModule.State('blogId') blogId!: number;
    @profileModule.Mutation(OPENPAGE_CHANGE) updatePage!: (show: boolean) => void;

    // prop
    @Prop({
      type: Object,
      default() {
        return {};
      },
    }) blog!: IBlogItem;
    @Prop(String) index!: string;

    // data
    coverImageList: ICoverImage[] = [];
    lastScrollTop: number = 0;
    Scroll: {
        lastScrollTop: number,
        direction: 'up' | 'down',
    } = {
        lastScrollTop: 0,
        direction: 'down',
    };
    coverImageStyle: ICoverImageInfo = {
        width: 100,
        height: 85,
        opacity: 1,
        index: 0,
        src: this.blog.cover,
    };

    created() {
      this.coverImageList = [{
          min: 0,
          alt: '',
          src: this.blog.cover,
      }];
    }
    mounted() {
        const context = this.$refs.blogPage as HTMLElement;
        context.addEventListener('scroll', this.scrollYGetImage, false);
    }
    @throttle(100) // 滚动防抖100ms
    scrollYGetImage(el: Event) {
        const st = (el.target as HTMLElement).scrollTop;
        const article = (this.$refs.article as Vue & {
            scrollDownGetSrc: (imageList: ICoverImage[], scrollY: number) => ICoverImageInfo,
            scrollUpGetSrc: (imageList: ICoverImage[], scrollY: number) => ICoverImageInfo,
        });
        if (st >= this.Scroll.lastScrollTop) {
            // downscroll code
            // 滚动高度 +  屏幕可视高度？
            this.Scroll.direction = 'down';
            this.FadeInOutImage(article.scrollDownGetSrc(this.coverImageList, st));
        } else {
            // upscroll code
            this.Scroll.direction = 'up';
            this.FadeInOutImage(article.scrollUpGetSrc(this.coverImageList, st));
        }
        this.Scroll.lastScrollTop = st <= 0 ? 0 : st; // phone st maybe < 0
    }
    FadeInOutImage(img: ICoverImageInfo) {
        this.coverImageStyle = img;
        console.log(img.index);
    }
    updateThemeBySelf() {
      this.$emit('updateTheme', this.blog.theme);
    }
    openPageHandle() {
      if (this.isCurrentBlog) {
        this.$router.replace(`/blog/${this.blogId}`);
        document.title = this.blog.title;
        this.updatePage(true);
      }
    }
    updateImageList(imageList: ICoverImage[]) {
        // 动画结束后再加载图片 节省性能
        setTimeout(() => {
            this.coverImageStyle.height = 100; // 高度初始化
            this.coverImageList = this.coverImageList.concat(imageList);
        }, 1600);
    }
    @Watch('blogId')
    updateSchema() {
      if (this.blogId === this.blog.id) {
        this.updateThemeBySelf();
      }
    }

    @Watch('isCurrentOpenBlog')
    clearCoverImageList(val: boolean) {
        if (!val) { // close blog
            this.coverImageList = [this.coverImageList[0]];
        }
    }
    get currentCoverImageStyle() {
        return (index: number) => {
            if (!this.isCurrentOpenBlog) {
                return {};
            }
            return index === this.coverImageStyle.index
                ? {
                    filter: `drop-shadow(0 20px 20px ${this.theme.dominant})`,
                    width: this.coverImageStyle.width + '%',
                    height: this.coverImageStyle.height + '%',
                    opacity: this.coverImageStyle.opacity,
                    zIndex: 999,
                }
                : {
                    zIndex: 500 - index - (this.coverImageStyle.index > index ? 200 : 0),
                };
        };
    }
    get isCurrentBlog() {
      return this.blogId === this.blog.id;
    }
    get isCurrentOpenBlog() {
        return this.isCurrentBlog && this.openPage;
    }
    get dominantStyle() {
      return {
          'color': `rgb(${this.theme.dominant.join(',')})`,
          'border-color': `rgb(${this.theme.dominant.join(',')})`,
      };
    }
    get secondaryStyle() {
      return {
          'color': `rgb(${this.theme.secondary.join(',')})`,
          'border-color': `rgb(${this.theme.secondary.join(',')})`,
      };
    }
    get fadeInOrOutClass() {
        return (imageIndex: number) => {
            if (imageIndex < this.coverImageStyle.index) {
                const isDownDirection = this.Scroll.direction === 'down';
                return {
                    'fade-out-move': isDownDirection,
                    'fade-in-move': !isDownDirection,
                };
            } else {
                return {};
            }
        };
    }
  }
</script>
<style lang="less" scoped>
    @import "../../animation/global";
    @import "../../animation/homePage";
    @media screen and (max-width: 1440px) {
        section.v-blog-page {
            max-width: 1440px;
            main{
                .mask{
                    width: 375px;
                }
            }
            footer {
                h1 {
                    padding-right: 70px;
                }
            }
        }
    }
    section{
        display: flex;
        width: 100%;
        height: 100%;
        * {
            transition: .3s all ease-in-out;
        }
        & + section{
            position: absolute;
            header{
                opacity: 0;
            }
            main {
                .mask{
                    border: none;
                    img{
                        height: 80%;
                    }
                }
            }
        }
        .iconfont{
            font-size: 1.8rem;
            padding-left: 5px;
        }
        header {
            box-sizing: border-box;
            width: 25%;
            padding-left: 50px;
            height: 100%;
            position: relative;
            .introducer{
                p {
                    font-style: italic;
                    font-weight: 300;
                    width: 65%;
                    word-wrap: break-word;
                }
                position: absolute;
                font-size: 1.8rem;
                bottom: 30%;
                padding-right: 50px;
            }
        }
        main{
            width: 25%;
            position: relative;
            .number{
                color: #2B3168;
                font-family: 'Ayuthaya';
                font-size: 2rem;
                position: absolute;
                top: 45%;
                left: -100px;
            }
            .mask{
                width: 100%;
                overflow: hidden;
                position: relative;
                height: 100%;
                border-left: 1px solid #d2d2d2;
                border-right: 1px solid #d2d2d2;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-wrap: wrap;
                img{
                    transition: all .1s ease-in-out;
                    position: absolute;
                    opacity: 1;
                    width: 100%;
                    height: 85%;
                    object-fit: cover;
                    &.fade-in{

                    }
                }
            }
        }
        footer{
            position: relative;
            flex: 1;
            overflow: hidden;
            display: flex;
            flex-wrap: wrap;
            .padding-box{
                padding-top: 50px;
                padding-left: 100px;
                padding-right: 150px;
                width: 100%;
                box-sizing: border-box;
                flex: 1;
            }
            .full-height-page{
                height: 100%;
            }
            .introducer{
                &:before{
                    content: '';
                    position: absolute;
                    left: -10px;
                    width: 2px;
                    height: 30px;
                    background: #262626;
                }
                p {
                    font-style: italic;
                    font-weight: 300;
                    word-wrap: break-word;
                }
                position: absolute;
                font-size: 1.8rem;
                bottom: 0;
                opacity: 0;
                padding-right: 50px;
            }
            .info{
                display: flex;
                justify-content: space-between;
                font-size: 1.6rem;
                .tags{
                    font-weight: 400;
                    a {
                        margin-right: 10px;
                        cursor: pointer;
                        padding-bottom: 3px;
                        &:hover {
                            border-bottom: 2px solid;
                        }
                    }
                }
            }
            .line{
                top: 0;
                position: absolute;
                left: 45%;
                height: 100%;
                border-right: 1px solid #d2d2d2;
            }
            .title {
                width: 100%;
                height: 250px;
                position: relative;
                top: 40%;
                .date {
                    position: absolute;
                    top: 0;
                    font-size: 2rem;
                    color: #8b8b8b;
                    font-style: italic;
                    font-weight: 300;
                    &.update-time + .create-time{
                        text-decoration: line-through;
                        top: -2rem;
                    }
                }
                h1{
                    position: absolute;
                    top: 15%;
                    font-size: 5rem;
                }
                .view{
                    font-size: 1.6rem;
                    font-family: 'Arial';
                    cursor: pointer;
                    line-height: 1.7rem;
                    position: absolute;
                    left: 150px;
                    bottom: 0;
                    border-bottom: 1px solid;
                    transition: all .15s ease-in-out;
                    &:hover {
                        border-bottom: 1px solid;
                    }
                }
            }
            article{
                position: relative;
                opacity: 0;
            }
            .the-gitalk{
                opacity: 0;
            }
        }
        /*& + section {*/
        /*width: 25%;*/
        /*}*/
    }
    .open-page{
        & + section, .number, .view, .line {
            animation-duration: .3s;
            animation-delay: 1.4s;
            animation-name: fade-out;
            animation-fill-mode:forwards;
        }
        header{
            animation-duration: .5s;
            animation-delay: 1.7s;
            animation-name: close-header;
            animation-fill-mode:forwards;
        }
        main{
            animation-duration: .5s;
            animation-delay: 1.7s;
            animation-name: open-main;
            animation-fill-mode:forwards;
            .mask {
                img {
                    &:first-child{
                        animation-duration: 2s;
                        animation-name: open-page;
                        animation-fill-mode:forwards;
                    }
                    height: 100%;
                }
            }
        }
        footer {
            animation-delay: 2.7s;
            animation-duration: 0s;
            animation-name: footer-hidden-to-show;
            animation-fill-mode:forwards;
            .title {
                animation-delay: 2s;
                animation-duration: .7s;
                animation-name: up-title;
                animation-fill-mode:forwards;
            }
            .introducer{
                animation-delay: 2.2s;
                animation-duration: .5s;
                animation-name: up-describe;
                animation-fill-mode:forwards;
            }
            article{
                animation-delay: 2.7s;
                animation-duration: 1s;
                animation-name: up-html;
                animation-fill-mode:forwards;
            }
            .the-gitalk{
                padding: 20px;
                flex: 1;
                animation-duration: .3s;
                animation-delay: 2.7s;
                animation-name: fade-in;
                animation-fill-mode:forwards;
            }
        }
    }
</style>
