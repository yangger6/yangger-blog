<template lang="pug">
    section(:style="dominantStyle").v-blog-page
        header
            .introducer
                p(:style="dominantStyle") When a Web Design Template Makes Sense. In general …When a Web Design Template Makes Sense
        main
            a.number
                | 01
            .mask
                img(:src="imgSrc")
        footer
            .line
            p.info
                span.tags
                    a HTML5
                    a CSS3
            span.date
                | 2019-05-23
            h1 I Create Website Design, that Make Sense.
            a.view VIEW MORE

</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import analyze from 'rgbaster'
    @Component({
    })
    export default class VBlogPage extends Vue {
        dominant: string = 'rgb(72, 109, 131)'
        secondary: string = '#5A5AFF'
        imgSrc: string = require('@/assets/3.jpg')
        created() {
            this.getImageColor()
        }
        async getImageColor() {
            const result = await analyze(
                this.imgSrc,
                {
                    ignore: [ 'rgb(255,255,255)', 'rgb(0,0,0)' ]
                })
            if (result && result.length) { // using 30-40ms
                this.dominant = result[0].color
                this.secondary = result[1].color
               // const length = result.length // Not very ideal.
               // let count = 0
               // for (let i = 0; i < length; i++) {
               //     const color = result[i].color
               //     const num = Number(color.match(/\d+/)[0])
               //     if (num > 45 && num < 200) {
               //         if (count === 0) {
               //             this.dominant = color
               //             count ++
               //         } else if (count === 1) {
               //             this.secondary = color
               //         } else {
               //             break
               //         }
               //     }
               // }
           }
        }
        get dominantStyle() {
            return {
                color: this.dominant,
                'border-color': this.dominant
            }
        }
        get secondaryStyle() {
            return {
                color: this.secondary,
                'border-color': this.secondary
            }
        }
    }
</script>
<style lang="less" scoped>
    @media screen and (max-width: 1440px) {
        section.v-blog-page {
            max-width: 1440px;
            main{
                .mask{
                    width: 375px;
                }
            }
            footer {
                h1 {
                    padding-right: 70px;
                }
            }
            /*& + section {*/
                /*min-width: 360px;*/
            /*}*/
        }
    }
    section{
        display: flex;
        width: 100%;
        height: 100%;
        & + section{
            position: absolute;
            left: 73%;
            header{
                opacity: 0;
            }
            main {
                .mask{
                    border: none;
                    img{
                        height: 80%;
                    }
                }
            }
        }
        .iconfont{
            font-size: 1.8rem;
            padding-left: 5px;
        }
        header {
            box-sizing: border-box;
            width: 25%;
            padding-left: 50px;
            height: 100%;
            position: relative;
            .introducer{
                p {
                    font-style: italic;
                    font-weight: 300;
                }
                position: absolute;
                font-size: 1.8rem;
                bottom: 30%;
                padding-right: 50px;
            }
        }
        main{
            width: 25%;
            position: relative;
            .number{
                color: #2B3168;
                font-family: 'Ayuthaya';
                font-size: 2rem;
                position: absolute;
                top: 45%;
                left: -100px;
            }
            .mask{
                width: 100%;
                height: 100%;
                border-left: 1px solid #d2d2d2;
                border-right: 1px solid #d2d2d2;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                img{
                    width: 100%;
                    height: 85%;
                    object-fit: cover;
                    filter: drop-shadow(0 20px 20px rgba(105, 105, 105, 0.98))
                }
            }
        }
        footer{
            position: relative;
            flex: 1;
            padding-top: 50px;
            padding-left: 100px;
            padding-right: 150px;
            .info{
                display: flex;
                justify-content: space-between;
                font-size: 1.6rem;
                .tags{
                    font-weight: 400;
                    a {
                        margin-right: 10px;
                        cursor: pointer;
                        padding-bottom: 3px;
                        &:hover {
                            border-bottom: 2px solid;
                        }
                    }
                }
            }
            .line{
                top: 0;
                position: absolute;
                left: 50%;
                height: 100%;
                border-right: 1px solid #d2d2d2;
            }
            .date {
                position: absolute;
                top: 45%;
                font-size: 2rem;
                color: #8b8b8b;
                font-style: italic;
                font-weight: 300;
            }
            h1{
                padding-right: 200px;
                position: absolute;
                top: 55%;
                font-size: 5rem;
            }
            .view{
                font-size: 1.6rem;
                font-family: 'Arial';
                cursor: pointer;
                line-height: 1.7rem;
                position: absolute;
                left: 23%;
                top: 75%;
                border-bottom: 1px solid;
                transition: all .15s ease-in-out;
                &:hover {
                    border-bottom: 1px solid;
                }
            }
        }
        /*& + section {*/
            /*width: 25%;*/
        /*}*/
    }
</style>
