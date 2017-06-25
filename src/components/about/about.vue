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
      <div class="log-item" v-for="log in logs">
        <a @click="showLog(log)">{{log.date}}</a>
        <ul v-if="log.show">
          <li v-for="text in log.data">{{text.value}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import 'about'
</style>
<script>
  export default{
    data () {
      return {
        openHead: false,
        logs: []
      }
    },
    methods: {
      showLog (log) {
        log.show = !log.show
      },
      open () {
        this.openHead = !this.openHead
      }
    },
    computed: {
      info () {
        let Info = {}
        Info.blogCount = this.$store.state.blog.length || 0
        let Log = {
          logs: this.$store.state.log,
          data: [],
          Count: 0
        }
        if (Log.logs) {
          for (let i in Log.logs) {
            if (typeof Log.logs[i] === 'object') {
              Log.Count += Log.logs[i].data.length
              Log.data.push({
                date: Log.logs[i].date,
                show: i < 5,
                data: Log.logs[i].data
              })
            }
          }
        }
        Info.logCount = Log.Count || 0
        this.logs = Log.data
        return Info
      }
    }
  }
</script>
