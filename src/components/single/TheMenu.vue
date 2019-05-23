<template lang="pug">
    i.menu
        div.line.line-1
        div.line.line-2
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
        z-index: 999;
        width: 23px;
        height: 17px;
        position: fixed;
        left: 50px;
        top: 50px;
        cursor: pointer;
        padding: 14px 11px;
        &:hover {
            .line-1{
                transform: rotate(135deg);
            }
            .line-2{
                transform: rotate(225deg);
                margin-top: -3px;
            }
        }
        .line{
            background-color: #7c88cf;
            height: 3px;
            transition: all .3s ease-in-out;
        }
        .line-2{
            margin-top: 3px;
        }
    }
</style>
