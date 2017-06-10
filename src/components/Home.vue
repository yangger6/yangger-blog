<template>
  <div class='Home'>
    <v-canvas></v-canvas>
    <art v-for = "data in datas" :data = data :tags= data.tags size = 'art-item'></art>
  </div>
</template>
<script>
  import canvas from './canvas/canvas.vue'
  export default {
    name: 'Home',
    data () {
      return {
        datas: [
          {
            title: '我是大标题',
            author: 'yangger',
            body: 'You re live! Nice. Weve put together a little post to introduce you to the Ghost editor and get you started. You can manage your content by ',
            markdown: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            date: '2017-6-9',
            hidden: false,
            tags: ['Javascript', 'CSS3', 'HTML5'],
            meta: {
              votes: '333',
              fav: '10'

            }
          },
          {
            title: '我是大标题',
            author: 'yangger',
            body: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            markdown: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            date: '2017-6-9',
            hidden: false,
            tags: ['Javascript', 'CSS3', 'HTML5'],
            meta: {
              votes: '333',
              fav: '10'

            }
          },
          {
            title: '我是大标题',
            author: 'yangger',
            body: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            markdown: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            date: '2017-6-9',
            hidden: false,
            tags: ['Javascript', 'CSS3', 'HTML5'],
            meta: {
              votes: '333',
              fav: '10'

            }
          },
          {
            title: '我是大标题',
            author: 'yangger',
            body: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            markdown: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            date: '2017-6-9',
            hidden: false,
            tags: ['Javascript', 'CSS3', 'HTML5'],
            meta: {
              votes: '333',
              fav: '10'

            }
          },
          {
            title: '我是大标题',
            author: 'yangger',
            body: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            markdown: '今天我呀呀呀呀呀呀哎呀呀呀呀呀呀呀呀呀哎呀',
            date: '2017-6-9',
            hidden: false,
            tags: ['Javascript', 'CSS3', 'HTML5'],
            meta: {
              votes: '333',
              fav: '10'

            }
          }
        ]
      }
    },
    components: {
      'v-canvas': canvas
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Home{
  }
</style>
