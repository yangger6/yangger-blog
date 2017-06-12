/**
 * Created by yangger on 2017/6/12.
 */
const serverUrl = 'http://localhost:3000/'
export const getBlog = async () => {
  try {
    const result = await Vue.$http.post(`${serverUrl}/blog/login`, {name: 'yangger', password: 'chenyang'})
    return result
  } catch (e) {
    return e
  }
}
