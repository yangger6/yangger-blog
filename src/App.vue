<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<style lang="less">
  @import '//at.alicdn.com/t/font_215287_8h7qrrlq5zh.css';
  @font-face {
      font-family: "Fira Code Medium";
      src: url("./font/fira-code/FiraCode-Medium.ttf"),
      url("./font/fira-code/FiraCode-Medium.otf");
  }
  body,html,#app{height: 100%;display: flex;flex: 1;overflow: hidden}
  body,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,input,textarea,p,blockquote,th,td,hr,button,article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{margin:0;padding:0}
  article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section { display:block; }
  table{border-collapse:collapse;border-spacing:0}
  audio,canvas,video { display: inline-block;*display: inline;*zoom: 1;}
  fieldset,img{border:0}
  address,caption,cite,code,dfn,em,strong,th,var{font-style:normal;font-weight:normal}
  ol,ul,li{list-style:none}
  caption,th{text-align:left}
  h1,h2,h3,h4,h5,h6{font-size:100%;font-weight:normal}
  q:before,q:after{content:''}
  abbr,acronym{border:0;font-variant:normal}
  sup{vertical-align:text-top}
  sub{vertical-align:text-bottom}
  input,textarea,select{font-family:inherit;font-size:inherit;font-weight:inherit}
  input,textarea,select{*font-size:100%}
  /* scrollbar */
  ::-webkit-scrollbar{width:3px;height:10px}
  ::-webkit-scrollbar-button{display:none}
  ::-webkit-scrollbar-track{background-color:black}
  ::-webkit-scrollbar-track-piece{background:#FFF}
  ::-webkit-scrollbar-thumb{background-color:#8E8E8E;border-radius:5px}
  ::-webkit-scrollbar-thumb:hover{background-color:#3B3B3B}
  ::-webkit-scrollbar-corner{background-color:#535353}
  :root {
    font-size: 10px;
    font-family: 'Open Sans','Helvetica Neue',Arial,'Hiragino Sans GB','Microsoft YaHei','WenQuanYi Micro Hei','sans-serif';
  }
  /*"Lucida Grande", "Lucida Sans Unicode", Helvetica, Arial, Verdana, sans-serif*/ // en waiting i18n
  @min-font-size: 1.4rem;
  @max-font-size: 1.8rem;
  @min-screen: 320px;
  @max-screen: 1440px;
</style>
