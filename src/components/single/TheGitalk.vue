<template lang="pug">
    .the-gitalk.gitalk-container
        #gitalk-container
</template>

<script lang="ts">
    import 'gitalk/dist/gitalk.css';
    import Gitalk from 'gitalk';
    import gitalkConfig from '@/config/gitalk.config';
    import { Component, Vue } from 'vue-property-decorator';
    @Component({})
    export default class TheMenu extends Vue {
        mounted() {
            gitalkConfig.id = this.$route.path;
            console.log(`blog route id -> ${this.$route.path}`);
            const gitalk = new Gitalk(gitalkConfig);
            gitalk.render('gitalk-container');
        }
    }
</script>
<style lang="less">
    .the-gitalk{
        .gt-comments-null{
            display: none;
        }
    }
</style>
