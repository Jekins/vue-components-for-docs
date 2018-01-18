require('../../stylus/components/_speed-dial.styl')

import Toggleable from '../../mixins/toggleable'
import Positionable from '../../mixins/positionable'

import ClickOutside from '../../directives/click-outside'

export default {
  name: 'v-speed-dial',

  mixins: [Positionable, Toggleable],

  directives: { ClickOutside },

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: (val) => {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    hover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes () {
      return {
        'vf-speed-dial': true,
        'vf-speed-dial--top': this.top,
        'vf-speed-dial--right': this.right,
        'vf-speed-dial--bottom': this.bottom,
        'vf-speed-dial--left': this.left,
        'vf-speed-dial--absolute': this.absolute,
        'vf-speed-dial--fixed': this.fixed,
        [`vf-speed-dial--direction-${this.direction}`]: true
      }
    }
  },

  render (h) {
    let children = []
    const data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: () => (this.isActive = !this.isActive)
      }
    }

    if (this.hover) {
      data.on.mouseenter = () => (this.isActive = true)
      data.on.mouseleave = () => (this.isActive = false)
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map((b, i) => {
        b.key = i

        return b
      })
    }

    const list = h('transition-group', {
      'class': 'vf-speed-dial__list',
      props: {
        name: this.transition,
        tag: 'div'
      }
    }, children)

    return h('div', data, [this.$slots.activator, list])
  }
}
