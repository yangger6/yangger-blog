<template lang="pug">
    article(v-html='html' ref="article").v-markdown.markdown-body
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    @Component({
    })
    export default class VMarkDown extends Vue {
        @Prop(Number) id!: number;
        @Prop(String) html!: string;

        imagePositionList: Array<{
            min: number,
            src: string,

        }> = [];

        mounted() {
            Array.from((this.$refs.article as Element)
                .getElementsByTagName('img'))
                .filter((img: HTMLImageElement) => img.alt)
                .map((img: HTMLImageElement) => {
                    this.imagePositionList.push({
                        min: img.offsetTop, // 距离屏幕高度
                        src: img.src,
                    });
                });
            this.imagePositionList = this.imagePositionList
                .sort((prev: {min: number}, next: {min: number}) => {
                    return prev.min - next.min;
                });
        }

        scrollDownGetSrc(scrollY: number) {
            for (const {min, src} of this.imagePositionList) {
                if (scrollY >= min) {
                    return src;
                }
            }
        }
        scrollUpGetSrc(scrollY: number) {
            for (const {min, src} of this.imagePositionList) {
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
