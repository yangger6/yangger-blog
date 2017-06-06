/**
 * Created by yangger on 2017/4/24.
 */
import topBar from './topBar'
import headImg from './headImg'
import list from './list'

const options = {
  topBar,
  headImg,
  list
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
