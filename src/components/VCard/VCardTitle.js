export default {
  name: 'v-card-title',

  functional: true,

  props: {
    primaryTitle: Boolean
  },

  render (h, { data, props, children }) {
    data.staticClass = (`vf-card__title ${data.staticClass || ''}`).trim()

    if (props.primaryTitle) data.staticClass += ' vf-card__title--primary'

    return h('div', data, children)
  }
}
