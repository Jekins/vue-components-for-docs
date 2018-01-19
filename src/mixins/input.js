import Loadable from './loadable'
import Themeable from './themeable'
import Validatable from './validatable'
import VIcon from '../components/VIcon'

export default {
  components: {
    VIcon
  },

  mixins: [Loadable, Themeable, Validatable],

  data () {
    return {
      isFocused: false,
      tabFocused: false,
      internalTabIndex: null,
      lazyValue: this.value
    }
  },

  props: {
    appendIcon: String,
    appendIconCb: Function,
    disabled: Boolean,
    hint: String,
    hideDetails: Boolean,
    label: String,
    persistentHint: Boolean,
    placeholder: String,
    prependIcon: String,
    prependIconCb: Function,
    readonly: Boolean,
    required: Boolean,
    tabindex: {
      default: 0
    },
    toggleKeys: {
      type: Array,
      default: () => [13, 32]
    },
    value: {
      required: false
    }
  },

  computed: {
    inputGroupClasses () {
      return Object.assign({
        'vf-input-group': true,
        'vf-input-group--async-loading': this.loading !== false,
        'vf-input-group--focused': this.isFocused,
        'vf-input-group--dirty': this.isDirty,
        'vf-input-group--tab-focused': this.tabFocused,
        'vf-input-group--disabled': this.disabled,
        'vf-input-group--error': this.hasError,
        'vf-input-group--append-icon': this.appendIcon,
        'vf-input-group--prepend-icon': this.prependIcon,
        'vf-input-group--required': this.required,
        'vf-input-group--hide-details': this.hideDetails,
        'vf-input-group--placeholder': !!this.placeholder,
        'theme--dark': this.dark,
        'theme--light': this.light
      }, this.classes)
    },
    isDirty () {
      return !!this.inputValue
    }
  },

  methods: {
    groupFocus (e) {},
    groupBlur (e) {
      this.tabFocused = false
    },
    genLabel () {
      return this.$createElement('label', {
        attrs: {
          for: this.$attrs.id
        }
      }, this.$slots.label || this.label)
    },
    genMessages () {
      let messages = []

      if ((this.hint &&
            this.isFocused ||
            this.hint &&
            this.persistentHint) &&
          this.validations.length === 0
      ) {
        messages = [this.genHint()]
      } else if (this.validations.length) {
        messages = [this.genError(this.validations[0])]
      }

      return this.$createElement('transition-group', {
        'class': 'vf-input-group__messages',
        props: {
          tag: 'div',
          name: 'slide-y-transition'
        }
      }, messages)
    },
    genHint () {
      return this.$createElement('div', {
        'class': 'vf-input-group__hint',
        key: this.hint,
        domProps: { innerHTML: this.hint }
      })
    },
    genError (error) {
      return this.$createElement(
        'div',
        {
          'class': 'vf-input-group__error',
          key: error
        },
        error
      )
    },
    genIcon (type, defaultCallback = null) {
      const shouldClear = type === 'append' && this.clearable && this.isDirty
      const icon = shouldClear ? 'clear' : this[`${type}Icon`]
      const callback = shouldClear
        ? this.clearableCallback
        : (this[`${type}IconCb`] || defaultCallback)

      return this.$createElement('v-icon', {
        'class': {
          [`vf-input-group__${type}-icon`]: true,
          'vf-input-group__icon-cb': !!callback,
          'vf-input-group__icon-clearable': shouldClear
        },
        props: {
          disabled: this.disabled
        },
        on: {
          click: e => {
            if (!callback) return

            e.stopPropagation()
            callback()
          }
        }
      }, icon)
    },
    genInputGroup (input, data = {}, defaultAppendCallback = null) {
      const children = []
      const wrapperChildren = []
      const detailsChildren = []

      data = Object.assign({}, {
        'class': this.inputGroupClasses,
        attrs: {
          tabindex: this.disabled
            ? -1
            : this.internalTabIndex || this.tabindex
        },
        on: {
          focus: this.groupFocus,
          blur: this.groupBlur,
          click: () => (this.tabFocused = false),
          keyup: e => {
            if ([9, 16].includes(e.keyCode)) {
              this.tabFocused = true
            }
          },
          keydown: e => {
            if (!this.toggle) return

            if (this.toggleKeys.includes(e.keyCode)) {
              e.preventDefault()
              this.toggle()
            }
          }
        }
      }, data)

      if (this.$slots.label || this.label) {
        children.push(this.genLabel())
      }

      wrapperChildren.push(input)

      if (this.prependIcon) {
        wrapperChildren.unshift(this.genIcon('prepend'))
      }

      if (this.appendIcon || this.clearable) {
        wrapperChildren.push(this.genIcon('append', defaultAppendCallback))
      }

      const progress = this.genProgress()
      progress && detailsChildren.push(progress)

      children.push(
        this.$createElement('div', {
          'class': 'vf-input-group__input'
        }, wrapperChildren)
      )

      !this.hideDetails && detailsChildren.push(this.genMessages())

      if (this.counter) {
        detailsChildren.push(this.genCounter())
      }

      children.push(
        this.$createElement('div', {
          'class': 'vf-input-group__details'
        }, detailsChildren)
      )

      return this.$createElement('div', data, children)
    }
  }
}
