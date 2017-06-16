<template>
  <div class="about">
    <div class="info" :class="{open: openHead}">
      <header>
        <a><img src="/static/head.png" alt="" @click="open"></a>
      </header>
      <main></main>
      <footer></footer>
    </div>
    <div class="log">
      <h2>日日日日日志==</h2>
      <div class="log-item" v-for="log in loggs">
        <a @click="showLog(log)">{{log.date}}</a>
        <ul v-if="log.show">
          <li v-for="text in log.text">{{text}}</li>
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
        logs: [
          {
            date: '2017-06-01',
            show: true,
            text: ['1', '2', '3']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          },
          {
            date: '2017-06-02',
            show: true,
            text: ['4', '5', '6']
          }
        ],
        openHead: false
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
      loggs () {
        this.logs.map((log, i) => {
          log.show = i < 5
        })
        return this.logs
      }
    }
  }
</script>
