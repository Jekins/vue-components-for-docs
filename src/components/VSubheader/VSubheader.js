require('../../stylus/components/_subheaders.styl')

import Themeable from '../../mixins/themeable'

export default {
  name: 'v-subheader',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render (h, { data, children, props }) {
    data.staticClass = (`vf-subheader ${data.staticClass || ''}`).trim()

    if (props.inset) data.staticClass += ' vf-subheader--inset'
    if (props.light) data.staticClass += ' vf-theme--light'
    if (props.dark) data.staticClass += ' vf-theme--dark'

    return h('li', data, children)
  }
}
