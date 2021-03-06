export default {
  functional: true,

  name: 'v-list-tile-action',

  render (h, { data, children }) {
    data.staticClass = data.staticClass ? `vf-list__tile__action vf-${data.staticClass || ''}` : 'vf-list__tile__action'
    if ((children || []).length > 1) data.staticClass += ' vf-list__tile__action--stack'

    return h('div', data, children)
  }
}
