<template lang="pug">
    .home.container
        the-menu
        v-blog-page
        v-blog-page
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VBlogPage from '@/components/views/VBlogPage.vue';
import TheMenu from '@/components/single/TheMenu.vue';

@Component({
    components: {TheMenu, VBlogPage},
})
export default class Home extends Vue {
}
</script>
<style lang="less" scoped>
    .container{
        display: flex;
        flex: 1;
    }
</style>
