import Routable from '../../mixins/routable'
import Toggleable from '../../mixins/toggleable'
import Ripple from '../../directives/ripple'

export default {
  name: 'v-list-tile',

  mixins: [Routable, Toggleable],

  directives: {
    Ripple
  },

  inheritAttrs: false,

  data: () => ({
    proxyClass: 'vf-list__tile--active'
  }),

  props: {
    activeClass: {
      type: String,
      default: 'primary--text'
    },
    avatar: Boolean,
    inactive: Boolean,
    tag: String
  },

  computed: {
    classes () {
      return {
        'vf-list__tile': true,
        'vf-list__tile--link': this.isLink && !this.inactive,
        'vf-list__tile--avatar': this.avatar,
        'vf-list__tile--disabled': this.disabled,
        'vf-list__tile--active': !this.to && this.isActive,
        [this.activeClass]: this.isActive
      }
    },
    isLink () {
      return this.href || this.to ||
        (this.$listeners && (this.$listeners.click || this.$listeners['!click']))
    }
  },

  render (h) {
    const isRouteLink = !this.inactive && this.isLink
    const { tag, data } = isRouteLink ? this.generateRouteLink() : {
      tag: this.tag || 'div',
      data: {
        class: this.classes
      }
    }

    data.attrs = Object.assign({}, data.attrs, this.$attrs)

    return h('li', {
      attrs: {
        disabled: this.disabled
      },
      on: {
        ...this.$listeners
      }
    }, [h(tag, data, this.$slots.default)])
  }
}
