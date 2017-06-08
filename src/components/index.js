/**
 * Created by yangger on 2017/4/24.
 */
import topBar from './topBar'
import headImg from './headImg'
import list from './list'
import art from './art'
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
