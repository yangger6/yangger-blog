/**
 * Created by yangger on 2017/7/30.
 */
import posts from '@/unit2/posts'
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
  selectBlog: state => state.blogs.data[state.blogs.data.selectIndex],
  queryBlog: state.queryBlog.data,
  queryBlogSelectIndex: state => state.queryBlog.selectIndex
}

// actions
const actions = {
  async getBlogs ({ commit }) {
    const Blogs = await posts.getBlogs()
    commit(types.RECEIVE_BLOGS, { Blogs })
  },
  async getBlog ({ commit, getters }) {
    const updateBlog = []
    commit(types.RECEIVE_BLOGS, { updateBlog })
  },
  async changBlogIndex ({ commit }, Index) {
    commit(types.CHANGE_BLOGSELECTINDEX, Index)
  },
  async addBlog ({ commit }, NewBlog) {
    commit(types.ADD_BLOG, NewBlog)
  },
  async updateBlog ({ commit }, UpdateBlog) {
    commit(types.UPDATE_BLOG, UpdateBlog)
  },
  async removeBlog ({commit}, Index) {
    commit(types.REMOVE_BLOG, Index)
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
  [types.RECEIVE_BLOG] (state, { Blog }) {

  },
  /**
   * 修改当前选中的博客
   * @param state
   * @param Index 需要选中博客的Index
   */
  [types.CHANGE_BLOGSELECTINDEX] (state, Index) {
    state.blog.selectIndex = Index
  },
  [types.ADD_BLOG] (state, NewBlog) {
    // 先重写Vuex  以后改成Vue.set 或 state.obj = { ...state.obj, newProp: 123}
    state.blogs.data.push(NewBlog)
    state.blogs.selectIndex += 1
  },
  [types.UPDATE_BLOG] (state, UpdateBlog) {
    state.blogs.data[state.blogs.selectIndex] = UpdateBlog
  },
  [types.REMOVE_BLOG] (state, Index) {
    if (state.blogs[Index]) {
      state.blogs.splice(Index, 1)
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
