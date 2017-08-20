/**
 * Created by yangger on 2017/7/30.
 */
import axios from 'axios'
const url = 'https://yangger.cn/api' // 处理请求地址
export default class posts {
  static async getBlogs () {
    try {
      const res = await axios.post(`${url}/blog/select`, {key: 'BlogAll', value: ' '})
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return []
    } catch (e) {
      console.log(e)
      return []
    }
  }
  static async getBlog (id) {
    try {
      const res = await axios.post(`${url}/blog/select`, {key: 'blogId', value: id})
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async addBlog (payload) {
    try {
      const res = await axios.post(`${url}/blog/add`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async updateBlog (payload) {
    try {
      const res = await axios.post(`${url}/blog/update`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async removeBlog (payload) {
    try {
      const res = await axios.post(`${url}/blog/remove`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async userLogin (payload) {
    try {
      const res = await axios.post(`${url}/user/login`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async getLogs () {
    try {
      const res = await axios.post(`${url}/log/select`)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async removeLog (payload) {
    try {
      const res = await axios.post(`${url}/log/remove`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
  static async addLog (payload) {
    try {
      const res = await axios.post(`${url}/log/add`, payload)
      if (res.statusText === 'OK' && res.status === 200) {
        return res.data
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
