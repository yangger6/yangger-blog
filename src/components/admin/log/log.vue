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
  import posts from '../../../post/post' // 数据库取数据
  export default{
    data () {
      return {
        selectLogIndex: 0,
        newLog: ''
      }
    },
    computed: {
      logs () {
        return this.$store.state.log
      },
      selectLog () {
        return this.logs[this.selectLogIndex].data || []
      }
    },
    methods: {
      changeLogIndex (index) {
        this.selectLogIndex = index
      },
      async addLog () {
        var arr = [].map.call(this.selectLog, log => {
          return {value: log.value}
        })
        arr.push({value: this.newLog})
        var result = await posts.addLog(this, {data: arr})
        if (result.msg === 'success') {
          this.$store.commit('addLog', {
            selectIndex: this.selectLogIndex,
            data: result.data.data
          })
        }
        this.newLog = ''
      },
      async delectLog (index) {
        this.$store.commit('removeLog', {
          selectIndex: this.selectLogIndex,
          logIndex: index
        })
        let removeId = this.logs[this.selectLogIndex]._id
        let result = await posts.removeLog(this, {
          _id: removeId,
          data: this.selectLog
        })
        console.log(result)
      }
    }
  }
</script>
