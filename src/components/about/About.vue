<template>
  <div class="about">
    <div class="info" :class="{open: openHead}">
      <header>
        <a><img src="/static/head.png" alt="" @click="open"></a>
      </header>
      <main>
        <div class="line"></div>
        <div class="box">
          <span>Yangger</span>
        </div>
        <div class="line"></div>
        <div class="box">
          <span>当前文章数:{{info.blogCount}}</span>
        </div>
        <div class="line"></div>
        <div class="box">
          <span>当前日志数: {{info.logCount}}</span>
        </div>
      </main>
      <footer></footer>
    </div>
    <div class="log">
      <h2>日日日日日志==</h2>
      <div class="log-item" v-for="(log, index) in logs" :key="log._id">
        <a @click="changeLogState(log)" :class="{openLog: log.show}">{{log.date}}</a>
        <list v-if="log.show" >
          <li v-for="text in log.data" :key="text._id">{{text.value}}</li>
        </list>
      </div>
    </div>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import 'about';
  @import "media";
</style>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default{
    data () {
      return {
        openHead: false
      }
    },
    methods: {
      ...mapMutations({
        'changeLogState': 'CHANGE_LOGSTATE'
      }),
      open () {
        this.openHead = !this.openHead
      }
    },
    computed: {
      ...mapGetters({
        info: 'userInfo',
        logs: 'logs'
      })
    }
  }
</script>
