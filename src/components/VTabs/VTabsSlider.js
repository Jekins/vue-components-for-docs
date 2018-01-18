import Colorable from '../../mixins/colorable'

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  data: () => ({
    defaultColor: 'vf-accent'
  }),

  render (h) {
    return h('li', {
      staticClass: 'vf-tabs__slider',
      class: this.addBackgroundColorClassChecks()
    })
  }
}
