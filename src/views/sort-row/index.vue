<template>
  <div class="sort-row">
    <ul :class="{'hold-on': sortHold}">
      <li
        v-for="(item, index) in sortList"
        :key="item.id"
        @touchstart.prevent="e => holdOn(index, e)"
        @touchmove.prevent="(e) => moving(index, e)"
        @touchend.prevent="holdEnd(index)"
        :class="{'hold-on': item.isHold}"
        :style="{transform: 'translate3d(0, ' + item.y + 'px, 0)'}"
      >
        <section>
          <header>
            <span>{{index + 1}}</span>
          </header>
          <section>
            <div class="context">{{item.value}}</div>
          </section>
          <footer>
            <i-handle :class="{'hold-on': item.isHold}"></i-handle>
          </footer>
        </section>
      </li>
    </ul>
  </div>
</template>
<script>
  import IHandle from './i-handle'
  export default {
    name: 'sort-row',
    components: {
      'i-handle': IHandle
    },
    data () {
      return {
        Timer: null,
        sortHold: false,
        dragObj: {
          startY: 0
        },
        sortList: [
          {value: '选项A', isHold: false, y: 0},
          {value: '选项B', isHold: false, y: 0},
          {value: '选项C', isHold: false, y: 0},
          {value: '选项D', isHold: false, y: 0}
        ]
      }
    },
    methods: {
      holdOn (index, event) {
        this.Timer = setTimeout(() => {
          this.sortList[index].isHold = true
          this.dragObj.startY = event.touches[0].clientY
          this.sortHold = true
        }, 200)
      },
      moving (index, event) {
        if (this.sortHold) {
          const moveLenth = event.touches[0].clientY - this.dragObj.startY
          this.sortList[index].y = moveLenth
          if (moveLenth > 24) { // height 24
            // this.movingY(index + 1, 54)
            this.changeIndex(index, index + 1)
          }
        }
      },
      holdEnd (index) {
        clearTimeout(this.Timer)
        this.sortList[index].isHold = false
        this.sortHold = false
        this.dragObj.startY = 0
      },
      changeIndex (oldIndex, newIndex) {
        const temp = this.sortList[oldIndex]
        this.sortList[oldIndex] = this.sortList[newIndex]
        this.sortList[newIndex] = temp
      },
      movingY (index, y) {
        this.sortList[index].y += y
      }
    }
  }
</script>
<style scoped lang="scss">
  .sort-row{
    padding: 100px 0;
    background: #edecec;
    height: 100vh;
    box-sizing: border-box;
    font-family: 'PingFang SC', tahoma, arial, 'helvetica neue', 'hiragino sans gb', 'microsoft yahei', sans-serif;
    * {
      box-sizing: border-box;
    }
    ul {
      padding-top: 20px;
      background: #fff;
      &.hold-on{
        li:not(.hold-on){
          header {
            span {
              background-color: #d2d2d2;
            }
          }
          footer {
            opacity: 0;
          }
        }
      }
      li {
        user-select: none;
        display: flex;
        position: relative;
        &:before {
          position: absolute;
          content: ' ';
          left: 20px;
          top: 0;
          width: 100%;
          border-top: 1px solid #e1edf1;
        }
        &.hold-on{
          z-index: 1;
          &:before {
            left: 0;
            border-color: #2863F3;
          }
          section {
            color: #efefef;
          }
          > section {
            box-shadow: 0 0 16px 1px rgba(0, 0, 0, 0.2), 0 0 0 1px #E2EDF1;
            &:before {
              background-color: #2863F3;
              opacity: .8;
            }
          }
        }
        &:not(.hold-on) {
          transition: .3s;
        }
        > section {
          display: flex;
          overflow: hidden;
          align-items: center;
          line-height: 24px;
          padding: 15px 20px;
          transition: 0.3s cubic-bezier(0.56, -1.14, 0.25, 1);
          flex: 1;
          &:before {
            content: ' ';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            z-index: 1;
          }
          > * {z-index: 2}
          header {
            margin-right: 10px;
            span {
              width: 20px;
              height: 20px;
              border-radius: 10px;
              background-color: #1155f0;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              transition: .2s;
            }
          }
          footer {
            transition: .2s;
          }
          section{
            flex: 1;
          }
        }
      }
    }
  }
</style>
