<template lang="pug">
    article(v-html='html' ref="article").v-markdown.markdown-body
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {ICoverImage} from '../../interface/components/IVMarkDown';
    @Component({
    })
    export default class VMarkDown extends Vue {
        @Prop(Number) id!: number;
        @Prop(String) html!: string;
        imagePositionList: ICoverImage[] = [];
        mounted() {
            Array.from((this.$refs.article as Element)
                .getElementsByTagName('img'))
                .filter((img: HTMLImageElement) => img.alt)
                .map((img: HTMLImageElement, index) => {
                    const min = img.offsetTop - (img.offsetHeight / 2 || 0);
                    this.imagePositionList.push({
                        min, // 滚动切换高度 = (图片距离顶部高度 - 图片高度 / 2) 图片可能加载失败没有高度hh
                        src: img.src,
                        alt: img.src,
                    });
                });
            this.imagePositionList = this.imagePositionList
                .sort((prev: {min: number}, next: {min: number}) => {
                    return prev.min - next.min;
            });
            this.$emit('loaded', this.imagePositionList);
        }
        scrollDownGetSrc(imageList: ICoverImage[], scrollY: number) {
            let deep = 0;
            for (const {min, src} of imageList) { // 根据图片的最小滚动高度来计算 透明度和缩放
                deep ++;
                const nextMin = imageList[deep].min; // 距离最近的下一个图片的距离顶部高度
                if (scrollY >= min && scrollY <= nextMin) {
                    const percentage = scrollY / nextMin;
                    const fallBack = percentage < 0; // 理论上放大是不会出现缩小的范畴
                    return {
                        src,
                        width: fallBack ? 100 : 100 + (50 * percentage), // 最大长度缩放 150% 最小100%,
                        height: fallBack ? 100 : 100 + (30 * percentage), // 最大高度缩放 130% 最小100%,
                        opacity: fallBack ? 1 : 1 - (percentage), // 最大0透明度，最小1,
                        index: deep - 1,
                    };
                }
            }
        }
        scrollUpGetSrc(imageList: ICoverImage[], scrollY: number) {
            for (const {min, src} of imageList) {
                if (scrollY <= min) {
                    return src;
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    @import "~github-markdown-css/github-markdown.css";
    .v-markdown{
        padding-top: 50px;
    }
    .markdown-body{
        pre, code {
            &.language-js{
                font-family: "Fira Code Medium";
            }
        }
    }
</style>
