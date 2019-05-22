<template lang="pug">
    .home.container
        v-blog-page
        v-blog-page
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VBlogPage from '@/components/views/VBlogPage.vue';

@Component({
    components: {VBlogPage},
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
