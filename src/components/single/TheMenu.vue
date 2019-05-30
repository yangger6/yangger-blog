<template lang="pug">
    i.menu
        div(:style="backgoundColor").line.line-1
        div(:style="backgoundColor").line.line-2
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {ISchema} from '../../store/profile/types';
    const profileModule = namespace('profile');
    @Component({
    })
    export default class TheMenu extends Vue {
      @profileModule.Getter('schema') schema!: ISchema;
      get backgoundColor() {
        return {
          'background-color': this.schema.dominant,
        };
      }
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
            height: 3px;
            transition: all .3s ease-in-out;
        }
        .line-2{
            margin-top: 3px;
        }
    }
</style>
