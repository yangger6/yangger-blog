<template>
<section class="log">
  <header>
    <h2>Log</h2>
    <section class="btn">
      <input type="text" v-model="newLog" @keyup.enter="addLog">
      <button style="border-radius: 3px;" @click="addLog">New Log</button>
    </section>
  </header>
  <section class="log-box">
    <section class="log-list">
      <input type="text">
      <list v-for="(log, index) in logs">
        <li>
          <a :class="{selected: selectLogIndex === index}"  @click="changeLogIndex(index)">
            <h3>{{log.date}}</h3>
          </a>
        </li>
      </list>
    </section>
    <section class="log-content">
      <list>
        <li v-for="(item, index) in selectLog">
          {{item.value}}
          <span>
            {{item.date.match(/T\d+:\d+:\d+/)[0].split('T')[1]}}
          </span>
          <a @click="delectLog(index)">
            <icon name="close"></icon>
          </a>
        </li>
      </list>
    </section>
  </section>
</section>
</template>
<style scoped rel="stylesheet/scss" lang="scss">
  @import "log.scss";
</style>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default{
    data () {
      return {
        selectLogIndex: 0,
        newLog: ''
      }
    },
    computed: {
      ...mapGetters({
        logs: 'logs'
      }),
      selectLog () {
        return this.logs[this.selectLogIndex].data || []
      }
    },
    methods: {
      ...mapActions([
        'addLogData',
        'removeLog'
      ]),
      changeLogIndex (index) {
        this.selectLogIndex = index
      },
      async addLog () {
        var arr = [].map.call(this.selectLog, log => {
          return {value: log.value}
        })
        arr.push({value: this.newLog})
        await this.addLogData({
          data: arr,
          index: this.selectLogIndex
        })
        this.newLog = ''
      },
      async delectLog (index) {
        await this.removeLog({
          selectLogIndex: this.selectLogIndex,
          LogIndex: index
        })
      }
    }
  }
</script>
