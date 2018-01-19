require('../../stylus/components/_cards.styl')

import Colorable from '../../mixins/colorable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'

export default {
  name: 'v-card',

  mixins: [Colorable, Routable, Themeable],

  props: {
    flat: Boolean,
    height: {
      type: String,
      default: 'auto'
    },
    hover: Boolean,
    img: String,
    raised: Boolean,
    tag: {
      type: String,
      default: 'div'
    },
    tile: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'vf-card': true,
        'vf-card--flat': this.flat,
        'vf-card--horizontal': this.horizontal,
        'vf-card--hover': this.hover,
        'vf-card--raised': this.raised,
        'vf-card--tile': this.tile,
        'theme--light': this.light,
        'theme--dark': this.dark
      })
    },
    styles () {
      const style = {
        height: isNaN(this.height) ? this.height : `${this.height}px`
      }

      if (this.img) {
        style.background = `url("${this.img}") center center / cover no-repeat`
      }

      return style
    }
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()

    data.style = this.styles

    return h(tag, data, this.$slots.default)
  }
}
