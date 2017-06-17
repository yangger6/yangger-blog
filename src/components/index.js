/**
 * Created by yangger on 2017/4/24.
 */
import topBar from './Tools/header/topBar'
import headImg from './Tools/headImg'
import list from './Tools/list'
import art from './Tools/art'
const options = {
  topBar,
  headImg,
  list,
  art
}
options.install = (Vue) => {
  for (let component in options) {
    const componentInstaller = options[component]
    if (componentInstaller && component !== 'install') {
      Vue.use(componentInstaller)
    }
  }
}
export default options
