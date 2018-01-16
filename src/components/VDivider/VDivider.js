require('../../stylus/components/_dividers.styl')

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-divider',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { props, data, children }) {
    data.staticClass = (`vf-divider ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' vf-divider--inset'
    if (props.light) data.staticClass += ' vf-theme--light'
    if (props.dark) data.staticClass += ' vf-theme--dark'

    return h('hr', data)
  }
}
