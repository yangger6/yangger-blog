/**
 * Created by yangger on 2017/7/30.
 */
export const userInfo = (state, getters) => {
  let Info = {}
  Info.blogCount = state.blog.blogs.data.length || 0
  Info.logCount = getters.logCount || 0
  return Info
}
