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
import IBlog from '../api/IServices/IBlog';

@Component({
    components: {TheMenu, VBlogPage},
})
export default class Home extends Vue {
  async created() {
    const result = await IBlog.post();
  }
}
</script>
<style lang="less" scoped>
    .container{
        display: flex;
        flex: 1;
    }
</style>
