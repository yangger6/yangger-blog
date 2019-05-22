<template lang="pug">
    i.menu
        div.line-1
        div.line-2
        div.line-3
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    @Component({
    })
    export default class TheMenu extends Vue {
    }
</script>
<style lang="less" scoped>
    .menu{
        width: 23px;
        height: 17px;
        position: fixed;
    }
</style>
