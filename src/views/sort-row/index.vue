<template>
  <div class="sort-row">
    <ul :class="{'hold-on': sortHold}" ref="sortRow">
      <li
        v-for="(item, index) in sortList"
        :key="index"
        @touchstart.prevent="e => holdOn(item, e)"
        @touchmove.prevent="(e) => moving(item, e)"
        @touchend.prevent="holdEnd(item)"
        :class="{'hold-on': item.isHold}"
        :data-index="index"
      >
        <section>
          <header>
            <span :data-index="item.vNode && Number(item.vNode.getAttribute('data-index')) + 1"></span>
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
  import IHandle from './i-handle/index'
  export default {
    name: 'sort-row',
    components: {
      'i-handle': IHandle
    },
    data () {
      return {
        Timer: null,
        sortHold: false,
        changing: false,
        dragObj: {
          move: 0,
          startY: 0
        },
        sortList: [
          {index: 0, value: '选项A', isHold: false},
          {index: 1, value: '选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B选项B', isHold: false},
          {index: 2, value: '选项C', isHold: false},
          {index: 3, value: '选项D', isHold: false}
        ]
      }
    },
    mounted () {
      [...this.$refs.sortRow.childNodes].map((node, index) => {
        this.$set(this.sortList, index, {
          ...this.sortList[index],
          vNode: node
        })
      })
    },
    methods: {
      holdOn (item, event) {
        this.Timer = setTimeout(() => {
          item.isHold = true
          this.dragObj.startY = event.touches[0].clientY
          this.dragObj.startIndex = item.index
          this.sortHold = true
        }, 200)
      },
      moving (item, event) {
        if (this.sortHold && !this.changing) {
          const touch = event.touches[0]
          const moveLenth = touch.clientY - this.dragObj.startY
          const currentNode = touch.target.offsetParent
          const currentY = currentNode.getBoundingClientRect().top
          const currentIndex = this.sortList.findIndex(({index}) => this.dragObj.startIndex === index)
          console.log(this.sortList)
          const nextNode = this.sortList[currentIndex + 1] && this.sortList[currentIndex + 1].vNode
          const prevNode = this.sortList[currentIndex - 1] && this.sortList[currentIndex - 1].vNode
          let log = 1
          if (log) {
            console.log(`-------nextNode--------`)
            console.log(nextNode)
            console.log(`---------------`)
            console.log(`-------prevNode--------`)
            console.log(prevNode)
            console.log(`---------------`)
          }
          this.movingY(currentNode, moveLenth)
          if (nextNode) {
            if (currentY + currentNode.offsetHeight > nextNode.getBoundingClientRect().top + nextNode.offsetHeight / 2) {
              this.changing = true
              this.dragObj.move++
              this.movingY(nextNode, -currentNode.offsetHeight)
              this.chaneIndex(item.index, item.index + 1)
            }
          }
          if (prevNode) {
            // if (currentY < prevNode.getBoundingClientRect().top + prevNode.offsetHeight / 2) {
            //   this.movingY(prevNode, 0)
            //   this.chaneIndex(item.index - 1, item.index)
            //   this.dragObj.move--
            // }
          }
        }
      },
      holdEnd (item) {
        clearTimeout(this.Timer)
        item.isHold = false
        this.sortHold = false
        this.dragObj = {
          move: 0,
          startY: 0
        };
        [...this.$refs.sortRow.childNodes].map((node, index) => {
          node.removeAttribute('style')
        })
        console.log(this.sortList.map(({ index }) => index))
      },
      movingY (item, y) {
        console.log('moving ' + item.getAttribute('data-index') + ' to ' + y)
        item.style.transform = 'translate3d(0, ' + y + 'px, 0)'
      },
      chaneIndex (oldIndex, newIndex) {
        console.log(`change index ${oldIndex} -> ${newIndex}`)
        const index = this.sortList[oldIndex].index
        const oldNode = this.sortList[oldIndex].vNode
        const newNode = this.sortList[newIndex].vNode
        const showIndex = oldNode.getAttribute('data-index')
        oldNode.setAttribute('data-index', newIndex)
        newNode.setAttribute('data-index', showIndex)
        this.sortList[oldIndex].index = this.sortList[newIndex].index
        this.sortList[oldIndex].vNode = newNode
        this.sortList[newIndex].index = index
        this.sortList[newIndex].vNode = oldNode
        this.changing = false
      }
    },
    computed: {
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
          z-index: 10;
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
              &:before{
                content: attr(data-index);
              }
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
