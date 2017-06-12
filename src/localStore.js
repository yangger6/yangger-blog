/**
 * Created by yangger on 2017/6/12.
 */
const key = 'yangger666'
const localStorage = window.localStorage
// 虚拟数据
if (!localStorage.getItem(key)) {
  let data = {
    // 登录用户
    user: {
      id: 1,
      name: 'yangger',
      headImg: 'https://avatars1.githubusercontent.com/u/23329645?v=3&s=40'
    },
    selectIndex: 0,
    blog: [
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
  localStorage.setItem(key, JSON.stringify(data))
}
export default {
  fetch () {
    return JSON.parse(localStorage.getItem(key))
  },
  save (store) {
    localStorage.setItem(key, JSON.stringify(store))
  }
}
