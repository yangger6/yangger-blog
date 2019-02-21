<template>
  <div class="about-box">
    <div class="about">
      <!--<div class="nav-box">-->
      <!--<section>-->
      <!--<router-link to="/">主页</router-link>-->
      <!--<router-link to="/about">我的</router-link>-->
      <!--</section>-->
      <!--<section>-->
      <!--<router-link to="https://github.com/yangger6">GITHUB</router-link>-->
      <!--<router-link to="/posts">文章</router-link>-->
      <!--</section>-->
      <!--</div>-->
      <!--<div class="message">-->
      <!--<h4>Yangger Blog</h4>-->
      <!--</div>-->
      <div class="black-line"></div>
      <div class="left">
        <div class="box-frame"><div></div><div></div><div></div></div>
        <div class="box-frame"><div></div><div></div><div></div></div>
        <div class="box-frame"><div></div><div></div><div></div></div>
        <div class="box-frame"><div></div><div></div><div></div></div>
        <div class="context">
          <h1>A Front End Engineer</h1>
          <p>Yangger</p>
          <p>19 years old</p>
          <p>...</p>
          <router-link to="/blog/0">
            READ MORE
          </router-link>
        </div>
        <img src="~@/assets/about-big.png" alt="">
      </div>
      <div class="right">
        <div class="head">
          <img src="~@/assets/about.png" alt="">
          <p>Blog Count: {{info.blogCount}}</p>
          <p>Log Count: {{info.blogCount}}</p>
        </div>
        <ul class="log-list">
          <li v-for="(log, index) in logs" :key="log._id">
            <h4><span>{{index + 1}}. </span>{{log.date}}</h4>
            <p v-for="text in log.data" :key="text._id">{{text.value}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    name: 'index',
    methods: {
      ...mapMutations({
        'changeLogState': 'CHANGE_LOGSTATE'
      })
    },
    computed: {
      ...mapGetters({
        info: 'userInfo',
        logs: 'logs'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .about-box{
    width: 100%;
    position: absolute;
    overflow: hidden;
    height: 100%;
  }
  .about{
    width: calc(100% + 400px);
    overflow: hidden;
    height: 100%;
    background: #010206;
    position: absolute;
    z-index: 9;
    display: flex;
    transition: all .3s ease;
    .nav-box{
      position: absolute;
      top: calc(50% - 25px);
      left: calc(50% - 100px);
      width: 200px;
      height: 50px;
      opacity: 0;
      z-index: 2;
      animation: fadein 0.1s ease 1.4s forwards;
      @keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      section{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        &:nth-child(1) {
          animation-name: top-page__scale-nav, rotate-nav-1;
          animation-duration: .3s , .5s;
          animation-delay: 1.4s , 1.7s;
          animation-fill-mode: forwards;
        }
        &:nth-child(2) {
          animation-name: top-page__scale-nav, rotate-nav-2;
          animation-duration: .3s , .5s;
          animation-delay: 1.4s , 1.7s;
          animation-fill-mode: forwards;
        }
        @keyframes top-page__scale-nav {
          0% {
            width: 200px;
            left: calc(50% - 100px);
          }
          100% {
            width: 700px;
            left: calc(50% - 350px);
          }
        }
        @keyframes rotate-nav-1 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(20deg);
          }
        }
        @keyframes rotate-nav-2 {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-20deg);
          }
        }
        a{
          display: block;
          position: absolute;
          top: 0;
          width: 200px;
          height: 50px;
          border-radius: 30px;
          font-size: 17px;
          font-weight: bold;
          text-align: center;
          line-height: 50px;
          overflow: hidden;
          color: #000;
          cursor: pointer;
          transition: all 0.3s ease 0s;
          text-decoration: none;
          background-color: #fff;
          &:hover{
            transform: scale(1.2);
            border-radius: 0;
            &:before,&:after {
              transform: translateX(0);
            }
          }
          &:before{
            top: 5px;
            left: 5px;
            transform: translateX(calc(-100% + -5px));
            content: "";
            display: block;
            position: absolute;
            width: 60%;
            height: 1px;
            background-color: #000;
            opacity: 0.6;
            transition: all 0.5s ease 0s;
          }
          &:after{
            content: "";
            display: block;
            position: absolute;
            width: 60%;
            height: 1px;
            background-color: #000;
            opacity: 0.6;
            transition: all 0.5s ease 0s;
            bottom: 5px;
            right: 5px;
            transform: translateX(calc(100% + 5px));
          }
          &:nth-child(1){
            left: 0;
          }
          &:nth-child(2){
            right: 0;
          }
        }
      }
    }
    .message{
      position: absolute;
      left: calc(50% - 125px);
      top: calc(50% - 25px);
      width: 0px;
      height: 50px;
      border-radius: 30px;
      background-color: #d2812b;
      box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
      overflow: hidden;
      z-index: 1;
      animation-name: top-page-show-message, top-page-hidden-message;
      animation-duration: .4s , .5s;
      animation-delay: 1s , 2s;
      animation-fill-mode: forwards;
      @keyframes top-page-show-message {
        0% {
          width: 0;
        }
        100% {
          width: 250px;
        }
      }
      @keyframes top-page-hidden-message {
        0% {
          width: 250px;
          left: calc(50% - 125px);
        }
        100% {
          width: 0px;
          left: 50%;
        }
      }
      h4 {
        width: 250px;
        height: 50px;
        font-size: 19px;
        color: rgba(255, 255, 255, 0.8);
        text-align: center;
        line-height: 50px;
        transform: translateY(100%);
        animation-name: slide-top, fadeout;
        animation-duration: .5s , .1s;
        animation-delay: 1.2s , 2s;
        animation-fill-mode: forwards;
        @keyframes slide-top {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        @keyframes fadeout {
          0% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
      }
    }
    .logo{
      position: absolute;
      top: calc(50% - 50px);
      left: 0;
      width: 100%;
      height: 100px;
      background-color: rgba(255, 255, 255, 0.5);
      opacity: 0;
      z-index: 1;
      animation: fadein 2s ease 2.7s forwards;
      @keyframes fadein {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
      img{
        position: absolute;
        left: calc(50% - 150px);
        top: 0;
        vertical-align: bottom;
        display: block;
        width: 300px;
        background-color: rgba(255, 255, 255, 0.2);
        height: 100px;
      }
    }
    .box-frame{
      &:nth-child(1){
        top: 20px;
        left: 20px;
      }
      &:nth-child(2){
        top: 20px;
        right: 20px;
        transform: rotate(90deg);
      }
      &:nth-child(3){
        bottom: 20px;
        left: 20px;
        transform: rotate(270deg);
      }
      &:nth-child(4){
        bottom: 20px;
        right: 20px;
        transform: rotate(180deg);
      }
      width: 45px;
      height: 45px;
      position: absolute;
      >div{
        background: #e28d1f;
        opacity: .8;
      }
      > div:nth-child(1) {
        width: 25px;
        height: 25px;
      }
      > div:nth-child(2) {
        width: 12px;
        height: 12px;
        position: absolute;
        right: 0;
        top: 0;
      }
      > div:nth-child(3) {
        width: 12px;
        height: 12px;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    .left{
      width: calc(100% - 400px);
      height: 100%;
      overflow: hidden;
      background: #010206;
      display: flex;
      align-items: center;
      position: relative;
      .context{
        margin-left: 250px;
        width: 350px;
        height: 400px;
        color: #fff;
        h1{
          font-size: 3.5rem;
        }
        p{
          margin-bottom: 15px;
          color: #fff;
        }
        a{
          color: #b5b5b5;
          padding-bottom: 2px;
          text-decoration: none;
          border-bottom: 2px solid #ab5416;
          transition: all .3s ease;
          &:hover{
            color: #ffffff;
            border-bottom: 2px solid #dd6d1c;
          }
        }
      }
      img{
        width: 600px;
        position: absolute;
        right: 170px;
      }
    }
    .right{
      width: 400px;
      height: 100%;
      background: #fff;
      display: flex;
      flex-wrap: wrap;
      z-index: 1;
      .head{
        width: 100%;
        height: 320px;
        position: relative;
        p{
          position: absolute;
          bottom: 10px;
          left: 10px;
          color: #fff;
          &:nth-child(2) {
            bottom: 30px;
          }
        }
        img{
          width: 100%;
          height: 320px;
        }
      }
      .log-list{
        box-sizing: border-box;
        height: calc(100% - 370px);
        padding-top: 100px;
        padding-left: 20px;
        overflow: auto;
        h4 {
          font-size: 1.2rem;
          color: #f09d59;
          span{
            color: #5d6b79;
          }
        }
        p{
          margin-left: 60px;
          &:last-child{
            padding-bottom: 20px;
            border-bottom: 1px solid #dadee1;
            margin-bottom: 20px;
          }
        }
      }
    }
    /*.black-line{*/
      /*height: 2px;*/
      /*width: 100%;*/
      /*position: absolute;*/
      /*top: calc(50% - 1px);*/
      /*background: #000;*/
      /*animation-duration: 1s;*/
      /*animation-name: line-to-right;*/
    /*}*/
    /*@keyframes line-to-right {*/
      /*from {*/
        /*width: 0;*/
      /*}*/
      /*to {*/
        /*width: 100%;*/
      /*}*/
    /*}*/
  }
</style>
