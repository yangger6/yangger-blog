/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  blogs: {
    data: [],
    selectIndex: 0
  },
  queryBlog: {
    data: [],
    selectIndex: 0
  }
}
// getters
const getters = {
  blogs: state => state.blogs.data,
  blogSelectIndex: state => state.blogs.selectIndex,
  selectBlog: state => state.blogs.data[state.blogs.selectIndex],
  queryBlog: state => state.queryBlog.data,
  queryBlogSelectIndex: state => state.queryBlog.selectIndex
}

// actions
const actions = {
  async getBlogs ({ commit }) {
    const Blogs = await posts.getBlogs()
    commit(types.RECEIVE_BLOGS, { Blogs })
  },
  async getBlog ({ commit, state }) {
    const blogId = state.blogs.data[state.blogs.selectIndex]._id
    const updateBlog = await posts.getBlog(blogId)
    commit(types.RECEIVE_BLOG, { updateBlog })
  },
  async changeBlogIndex ({ commit }, Index) {
    commit(types.CHANGE_BLOGSELECTINDEX, Index)
  },
  async addBlog ({ commit }, NewBlog) {
    const result = await posts.addBlog(NewBlog)
    if (result.msg === 'success') {
      commit(types.ADD_BLOG, result)
      return result.msg
    }
    return 'error'
  },
  async updateBlog ({ commit }, UpdateBlog) {
    const result = await posts.updateBlog(UpdateBlog)
    if (result.msg === 'success') {
      commit(types.UPDATE_BLOG, result)
      return result.msg
    }
    return 'error'
  },
  async removeBlog ({ commit }, { id, index }) {
    const result = await posts.removeBlog({_id: [ id ]})
    if (result === 'success') {
      commit(types.REMOVE_BLOG, index)
      return result
    }
    return 'error'
  },
  async changeBlogMeta ({ commit, state }, Meta) {
    commit(types.CHANGE_BLOGMETA, Meta)
    await posts.updateBlog(state.blogs.data[Meta.Index])
  }
}

// mutations
const mutations = {
  /**
   * 接受post到的数据存入store
   * @param state
   * @param Blogs 博客数据
   */
  [types.RECEIVE_BLOGS] (state, { Blogs }) {
    state.blogs.data = Blogs
  },
  /**
   * 点进文章的时候更新数据
   * @param state
   * @param Blog 更新后的数据
   */
  [types.RECEIVE_BLOG] (state, { updateBlog }) {
    state.blogs.data[state.blogs.selectIndex] = updateBlog
  },
  /**
   * 修改当前选中的博客
   * @param state
   * @param Index 需要选中博客的Index
   */
  [types.CHANGE_BLOGSELECTINDEX] (state, Index) {
    state.blogs.selectIndex = Index
  },
  [types.ADD_BLOG] (state, { data }) {
    // 先重写Vuex  以后改成Vue.set 或 state.obj = { ...state.obj, newProp: 123}
    state.blogs.data.push(data)
    state.blogs.selectIndex += 1
  },
  [types.UPDATE_BLOG] (state, { data }) {
    state.blogs.data[state.blogs.selectIndex] = data
  },
  [types.REMOVE_BLOG] (state, Index) {
    if (state.blogs.data[Index]) {
      state.blogs.data.splice(Index, 1)
      state.blogs.selectIndex = 0
    } else {
      console.log(`removeBlog error is blog[index] undefined`)
    }
  },
  /**
   *
   * @param state
   * @param Index 第几篇博客
   * @param Meta 标签名
   * @param Opt 加或是减
   */
  [types.CHANGE_BLOGMETA] (state, {Index, Meta, Opt}) {
    state.blogs.data[Index].meta[Meta] += Opt
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}