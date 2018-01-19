require('./stylus/app.styl')
import Semver from 'semver'
import { peerDependencies, version } from '../package.json'
import * as components from './components'
import * as directives from './directives'

function Doctify (Vue, args) {
  const Doctify = components.Doctify

  Vue.use(Doctify, {
    components,
    directives,
    ...args
  })
}

Doctify.version = version

function checkVueVersion () {
  const vueDep = peerDependencies.vue
  if (!Semver.satisfies(window.Vue.version, vueDep)) {
    console.warn(`Doctify requires Vue version ${vueDep}`)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.version && checkVueVersion()
  window.Vue.use(Doctify)
}

export default Doctify
