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
            const ArticleElement = this.$refs.article as HTMLElement;
            const selfTop = ArticleElement.offsetTop;
            Array.from(ArticleElement
                .getElementsByTagName('img'))
                .filter((img: HTMLImageElement) => img.alt)
                .map((img: HTMLImageElement, index) => {
                    const min = selfTop + img.offsetTop - (img.offsetHeight / 2 || 0);
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
                try {
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
                } catch (e) { // 进入这里是因为 当向下滚到最后一位时，取不到nextMin，最后一张图不缩放
                    return {
                        src,
                        width: 100,
                        height: 100,
                        opacity: 1,
                        index: deep - 1,
                    };
                }
            }
        }
        scrollUpGetSrc(imageList: ICoverImage[], scrollY: number) {
            let deep = 0;
            // 从下到上 先倒序
            const reverseList = imageList.reverse();
            for (const {min, src} of reverseList) {
                deep++;
                debugger
                const nextMin = imageList[deep].min; // 距离最近的上一个图片的距离顶部高度
                if (scrollY <= min && scrollY >= nextMin) {
                    const percentage = nextMin / scrollY;
                    const fallBack = percentage > 1; // 理论上放大是不会出现缩小的范畴
                    return {
                        src,
                        width: fallBack ? 100 : 150 - (50 * percentage), // 最大长度缩放 150% 最小100%,
                        height: fallBack ? 100 : 150 - (30 * percentage), // 最大高度缩放 130% 最小100%,
                        opacity: fallBack ? 1 : percentage, // 最大0透明度，最小1,
                        index: imageList.length - deep,
                    };
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
