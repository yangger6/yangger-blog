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
    blog: []
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
