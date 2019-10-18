<template lang="pug">
    article(v-html='html').v-markdown.markdown-body
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from 'vue-property-decorator';
    @Component({
    })
    export default class VMarkDown extends Vue {
        @Prop(Number) id!: number;
        @Prop(String) html!: string;
        async created() {
            console.log(1);
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
