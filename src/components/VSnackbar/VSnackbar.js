require('../../stylus/components/_snackbars.styl')

import {
  VSlideYTransition,
  VSlideYReverseTransition
} from '../transitions'

import Colorable from '../../mixins/colorable'
import Toggleable from '../../mixins/toggleable'

export default {
  name: 'v-snackbar',

  components: {
    VSlideYTransition,
    VSlideYReverseTransition
  },

  mixins: [Colorable, Toggleable],

  data () {
    return {
      activeTimeout: {}
    }
  },

  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes () {
      return this.addBackgroundColorClassChecks({
        'vf-snack--active': this.isActive,
        'vf-snack--absolute': this.absolute,
        'vf-snack--bottom': this.bottom || !this.top,
        'vf-snack--left': this.left,
        'vf-snack--multi-line': this.multiLine && !this.vertical,
        'vf-snack--right': this.right,
        'vf-snack--top': this.top,
        'vf-snack--vertical': this.vertical
      })
    },
    computedTransition () {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition'
    }
  },

  watch: {
    isActive () {
      this.setTimeout()
    }
  },

  methods: {
    setTimeout () {
      clearTimeout(this.activeTimeout)

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(() => {
          this.isActive = false
        }, this.timeout)
      }
    }
  },

  mounted () {
    this.setTimeout()
  },

  render (h) {
    const children = []

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'vf-snack__content'
      }, this.$slots.default))
    }

    return h('div', {
      staticClass: 'snack',
      'class': this.classes,
      on: this.$listeners
    }, [h(this.computedTransition, children)])
  }
}
