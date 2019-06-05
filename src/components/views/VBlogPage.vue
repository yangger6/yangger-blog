<template lang="pug">
    section.v-blog-page(ref="page")
        header
            .introducer
                p(:style="dominantStyle") When a Web Design Template Makes Sense. In general …When a Web Design Template Makes Sense
        main
            a.number(:style="dominantStyle")
                | 01
            .mask(@click="openPage")
                img(:src="imgSrc" :style="{filter: `drop-shadow(0 20px 20px ${schema.dominant})`}")
        footer
            .line
            p.info
                span.tags(:style="secondaryStyle")
                    a HTML5
                    a CSS3
            div.title
                span.date
                    | 2019-05-23
                h1(:style="dominantStyle") I Create Website Design, that Make Sense.
                a.view(:style="secondaryStyle") VIEW MORE

</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import analyze from 'rgbaster';
  import {namespace} from 'vuex-class';
  import {DOMINANT_CHANGE, ISchema, SECONDARY_CHANGE} from '../../store/profile/types';
  const profileModule = namespace('profile');
  @Component({
  })
  export default class VBlogPage extends Vue {
    @profileModule.Getter('schema') schema!: ISchema;
    @profileModule.Mutation(DOMINANT_CHANGE) updateDominant!: (color: string) => void;
    @profileModule.Mutation(SECONDARY_CHANGE) updateSecondary!: (color: string) => void;
    imgSrc: string = require('@/assets/background.png');
    created() {
      this.getImageColor();
    }
    async getImageColor() {
      const result = await analyze(
        this.imgSrc,
        {
          ignore: [
            'rgb(255, 255, 255)',
            'rgb(0, 0, 0)',
          ],
        });
      if (result && result.length) {
        this.updateDominant(result[0].color);
        this.updateSecondary(result[1].color);
      }
    }
    openPage() {
      (this.$refs.page as Element).classList.add('open-page');
    }
    get dominantStyle() {
      return {
        'color': this.schema.dominant,
        'border-color': this.schema.secondary,
      };
    }
    get secondaryStyle() {
      return {
        'color': this.schema.dominant,
        'border-color': this.schema.secondary,
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
            /*& + section {*/
            /*min-width: 360px;*/
            /*}*/
        }
    }
    section{
        display: flex;
        width: 100%;
        height: 100%;
        & + section{
            position: absolute;
            left: 73%;
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
                height: 100%;
                border-left: 1px solid #d2d2d2;
                border-right: 1px solid #d2d2d2;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                img{
                    width: 100%;
                    height: 85%;
                    object-fit: cover;
                }
            }
        }
        footer{
            position: relative;
            flex: 1;
            padding-top: 50px;
            padding-left: 100px;
            padding-right: 150px;
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
                left: 50%;
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
                    left: 23%;
                    bottom: 0;
                    border-bottom: 1px solid;
                    transition: all .15s ease-in-out;
                    &:hover {
                        border-bottom: 1px solid;
                    }
                }
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
                    animation-duration: 2s;
                    animation-name: open-page;
                    height: 100%;
                }
            }
        }
        footer {
            .title {
                animation-delay: 2s;
                animation-duration: .7s;
                animation-name: up-title;
                animation-fill-mode:forwards;
            }
        }
    }
</style>
