<template lang="pug">
    .v-author-box
        .share-box(:style="dominantStyle")
            i.iconfont.icon-share
        section.author-info(:style="secondaryStyle")
            header
                .circle-box
                    img(:src="headImage")
            main
                h2.author-name {{author || 'YANGGER'}}
                p.author-profile TECHNOLOGY CHANGES THE WORLD.
            footer
                b MORE FROM AUTHOR
                b.line(:style="{background: 'rgb(' + this.theme.secondary.join(',') + ')'}")
                b.left
                    i.iconfont.icon-arrow-lift
                    | OLDER
                b.right
                    | NEWER
                    i.iconfont.icon-arrow-right
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {namespace} from 'vuex-class';
    import {ITheme} from '../../store/profile/types';
    const profileModule = namespace('profile');
    @Component({})
    export default class VAuthorBox extends Vue {
        @Prop(String) author!: string;
        @Prop(String) headImage!: string;
        @Prop(String) profile!: string;
        @profileModule.Getter('theme') theme!: ITheme;
        get dominantStyle() {
            return {
                'background-color': `rgb(${this.theme.dominant.join(',')})`,
            };
        }
        get secondaryStyle() {
            return {
                color: `rgb(${this.theme.secondary.join(',')})`,
            };
        }
    }
</script>
<style lang="less">
    .v-author-box{
        box-shadow: 0 -4px 4px #00000050;
        width: 100%;
        height: 318px;
        padding: 65px;
        margin-top: 100px;
        position: relative;
        box-sizing: border-box;
        .share-box{
            width: 64px;
            height: 64px;
            position: absolute;
            right: 75px;
            background: #5A5AFF;
            top: -32px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                font-size: 26px;
                color: #fff;
            }
        }
        .author-info{
            display: flex;
            height: 110px;
            flex-wrap: wrap;
            flex: 1;
            header{
                .circle-box{
                    width: 110px;
                    height: 110px;
                    box-sizing: border-box;
                    border-radius: 50%;
                    overflow: hidden;
                    margin-right: 25px;
                }
                img{
                    width: inherit;
                    height: inherit;
                    object-fit: fill;
                }
            }
            main{
                flex: 1;
                height: 110px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                .author-name{
                    font-size: 21px;
                    width: 100%;
                }
                .author-profile{
                    font-size: 16px;
                }
            }
            footer {
                width: 100%;
                font-size: 16px;
                margin-top: 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .line{
                    height: 2px;
                    margin: 0 20px;
                    flex: 1;
                }
                b{
                    i{
                        font-size: 20px;
                    }
                    display: flex;
                    align-items: center;
                }
                .left,.right{
                    cursor: pointer;
                    transition: color .3s ease;
                    &:hover{
                        color: #6190e8;
                    }
                }
                .left{
                    margin-right: 30px;
                }
            }
        }
    }
</style>
