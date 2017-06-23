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
      id: '',
      name: '',
      headImg: ''
    },
    selectIndex: 0,
    admin: {
      selectIndex: 0,
      items: [
        {i: 'pencil', v: 'New Post', type: 'Editor'},
        {i: 'file-text', v: 'Content', type: 'Content'}
      ],
      blog: {
        title: '',
        body: '',
        markdown: ''
      }
    },
    blog: [],
    log: []
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
