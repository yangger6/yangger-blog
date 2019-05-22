<template lang="pug">
    section.v-blog-page
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
    })
    export default class VBlogPage extends Vue {
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1440px) {
        section.v-blog-page {
            max-width: 1440px;
            & + section {
                min-width: 360px;
            }
        }
    }
    section{
        display: flex;
        width: 75%;
        & + section {
            width: 25%;
        }
    }
</style>
