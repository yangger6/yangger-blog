/**
 * Created by yangger on 2017/4/24.
 */
import topBar from './tools/header/topBar'
import headImg from './tools/headImg'
import list from './tools/list'
import art from './tools/art'
import metaIcon from './tools/metaIcon'
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
