/**
 * Created by yangger on 2017/7/30.
 */
// import posts from '@/unit/posts'
import * as types from '../mutation-types'
// initial state
const state = {
  admin: {
    selectIndex: 0,
    items: [
      {i: 'pencil', v: 'New Post', type: 'Editor'},
      {i: 'file-text', v: 'Content', type: 'Content'},
      {i: 'bug', v: 'Log', type: 'Log'}
    ],
    blog: {
      title: '',
      tags: [],
      body: '',
      markdown: ''
    }
  }
}
// getters
const getters = {
  admin: state => state.admin,
  adminBlog: state => state.admin.blog,
  adminItems: state => state.admin.items,
  adminSelectIndex: state => state.admin.selectIndex
}

// actions
const actions = {
  async changeAdminIndex ({ commit }, Index) {
    commit(types.CHANGE_ADMINSELECTINDEX, Index)
  },
  async changeAdminBlog ({ commit }, Blog) {
    commit(types.CHANGE_ADMINBLOG, Blog)
  },
  async addAdminBlogTag ({ commit }, Tag) {
    commit(types.ADD_ADMINBLOGTAG, Tag)
  },
  async removeAdminBlogTag ({ commit }, Index) {
    commit(types.REMOVE_ADMINBLOGTAG, Index)
  }
}

// mutations
const mutations = {
  /**
   * 修改当前选中的菜单Index
   * @param state
   * @param Index 需要选中菜单的Index
   */
  [types.CHANGE_ADMINSELECTINDEX] (state, Index) {
    state.admin.selectIndex = Index
  },
  /**
   * 修改当前选中的博客
   * @param state
   * @param Blog 传进来的博客
   */
  [types.CHANGE_ADMINBLOG] (state, Blog) {
    state.admin.blog = Blog
  },
  /**
   * 增加博客的tag
   * @param state
   * @param Tag
   */
  [types.ADD_ADMINBLOGTAG] (state, Tag) {
    state.admin.blog.tags.push(Tag)
  },
  /**
   * 移除博客的Tag
   * @param state
   * @param Index
   */
  [types.REMOVE_ADMINBLOGTAG] (state, Index) {
    if (state.admin.blog.tags[Index]) {
      state.admin.blog.tags.splice(Index, 1)
    } else {
      console.log(`removeAdminTag error is tags[index] undefined`)
    }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
