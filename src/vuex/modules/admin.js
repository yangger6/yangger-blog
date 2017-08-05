/**
 * Created by yangger on 2017/7/30.
 */
// import posts from '@/unit2/posts'
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
  blog: state => state.admin.blog,
  items: state => state.admin.items,
  selectIndex: state => state.admin.selectIndex
}

// actions
const actions = {
  async changAdminIndex ({ commit }, Index) {
    commit(types.CHANGE_BLOGSELECTINDEX, Index)
  },
  async changAdminBlog ({ commit }, Blog) {
    commit(types.CHANGE_ADMINBLOG, { Blog })
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
  [types.CHANGE_ADMINBLOG] (state, Blog) {
    state.admin.blog = Blog
  },
  [types.ADD_ADMINBLOGTAG] (state, Tag) {
    state.admin.blog.tags.push(Tag)
  },
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
