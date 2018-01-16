require('../../stylus/components/_buttons.styl')

import Colorable from '../../mixins/colorable'
import Contextualable from '../../mixins/contextualable'
import Positionable from '../../mixins/positionable'
import Routable from '../../mixins/routable'
import Themeable from '../../mixins/themeable'
import { factory as ToggleableFactory } from '../../mixins/toggleable'

export default {
  name: 'v-btn',

  mixins: [
    Colorable,
    Contextualable,
    Routable,
    Positionable,
    Themeable,
    ToggleableFactory('inputValue')
  ],

  props: {
    activeClass: {
      type: String,
      default: 'vf-btn--active'
    },
    block: Boolean,
    depressed: Boolean,
    fab: Boolean,
    flat: Boolean,
    icon: Boolean,
    large: Boolean,
    loading: Boolean,
    outline: Boolean,
    ripple: {
      type: [Boolean, Object],
      default: true
    },
    round: Boolean,
    small: Boolean,
    tag: {
      type: String,
      default: 'button'
    },
    type: {
      type: String,
      default: 'button'
    },
    value: null
  },

  computed: {
    classes () {
      const colorBackground = !this.outline && !this.flat
      const colorText = !this.disabled && !colorBackground

      const classes = {
        'vf-btn': true,
        'vf-btn--active': this.isActive,
        'vf-btn--absolute': this.absolute,
        'vf-btn--block': this.block,
        'vf-btn--bottom': this.bottom,
        'vf-btn--disabled': this.disabled,
        'vf-btn--flat': this.flat,
        'vf-btn--floating': this.fab,
        'vf-btn--fixed': this.fixed,
        'vf-btn--hover': this.hover,
        'vf-btn--icon': this.icon,
        'vf-btn--large': this.large,
        'vf-btn--left': this.left,
        'vf-btn--loader': this.loading,
        'vf-btn--outline': this.outline,
        'vf-btn--depressed': this.depressed && !this.flat || this.outline,
        'vf-btn--right': this.right,
        'vf-btn--round': this.round,
        'vf-btn--router': this.to,
        'vf-btn--small': this.small,
        'vf-btn--top': this.top,
        ...this.themeClasses
      }

      if (!this.color) {
        return Object.assign(classes, {
          'vf-primary': this.primary && colorBackground,
          'vf-secondary': this.secondary && colorBackground,
          'vf-success': this.success && colorBackground,
          'vf-info': this.info && colorBackground,
          'vf-warning': this.warning && colorBackground,
          'vf-error': this.error && colorBackground,
          'vf-primary--text': this.primary && colorText,
          'vf-secondary--text': this.secondary && colorText,
          'vf-success--text': this.success && colorText,
          'vf-info--text': this.info && colorText,
          'vf-warning--text': this.warning && colorText,
          'vf-error--text': this.error && colorText
        })
      }

      return colorBackground
        ? this.addBackgroundColorClassChecks(classes)
        : this.addTextColorClassChecks(classes)
    }
  },

  methods: {
    // Prevent focus to match md spec
    click (e) {
      !this.fab &&
        e.detail &&
        this.$el.blur()

      this.$emit('click', e)
    },
    genContent () {
      return this.$createElement(
        'div',
        { 'class': 'vf-btn__content' },
        [this.$slots.default]
      )
    },
    genLoader () {
      const children = []

      if (!this.$slots.loader) {
        children.push(this.$createElement('v-progress-circular', {
          props: {
            indeterminate: true,
            size: 26
          }
        }))
      } else {
        children.push(this.$slots.loader)
      }

      return this.$createElement('span', { 'class': 'vf-btn__loading' }, children)
    }
  },

  mounted () {
    Object.keys(Contextualable.props).forEach(prop => {
      if (this[prop]) {
        console.warn(`Context prop '${prop}' for VBtn component has been deprecated. Use 'color' prop instead.`)
      }
    })
  },

  render (h) {
    const { tag, data } = this.generateRouteLink()
    const children = [this.genContent()]

    tag === 'button' && (data.attrs.type = this.type)
    this.loading && children.push(this.genLoader())

    data.attrs.value = ['string', 'number'].includes(typeof this.value)
      ? this.value
      : JSON.stringify(this.value)

    return h(tag, data, children)
  }
}
