/**
 * Created by yangger on 2017/4/24.
 */
import topBar from './Tools/header/topBar'
import headImg from './Tools/headImg'
import list from './Tools/list'
import art from './Tools/art'
import metaIcon from './Tools/metaIcon'
const options = {
  topBar,
  headImg,
  list,
  art,
  metaIcon
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
