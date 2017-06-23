/**
 * Created by yangger on 2017/6/14.
 * 链接数据库，请求数据
 */
const url = 'http://localhost:3000' // 处理请求地址
export default class posts {
  static async getBlogs (Vue) {
    try {
      const res = await Vue.$http.post(`${url}/blog/select`, {key: 'BlogAll', value: ' '})
      if (res.body && res.status === 200) {
        return res.body
      }
      return []
    } catch (e) {
      console.log(e)
      return []
    }
  }
  static async getBlog (Vue, id) {
    try {
      const res = await Vue.$http.post(`${url}/blog/select`, {key: 'id', value: id})
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async addBlog (Vue, payload) {
    try {
      const res = await Vue.$http.post(`${url}/blog/add`, payload)
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async updateBlog (Vue, payload) {
    try {
      const res = await Vue.$http.post(`${url}/blog/update`, payload)
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async removeBlog (Vue, payload) {
    try {
      const res = await Vue.$http.post(`${url}/blog/remove`, payload)
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async userLogin (Vue, payload) {
    try {
      const res = await Vue.$http.post(`${url}/user/login`, payload)
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getLogs (Vue) {
    try {
      const res = await Vue.$http.post(`${url}/log/select`)
      if (res.body && res.status === 200) {
        return res.body
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
