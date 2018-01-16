require('../../stylus/components/_icons.styl')

import Themeable from '../../mixins/themeable'
import Colorable from '../../mixins/colorable'

export default {
  name: 'v-icon',

  functional: true,

  mixins: [Colorable, Themeable],

  props: {
    disabled: Boolean,
    large: Boolean,
    left: Boolean,
    medium: Boolean,
    right: Boolean,
    xLarge: Boolean
  },

  render (h, { props, data, children = [] }) {
    let iconName = ''
    if (children.length) {
      iconName = children.pop().text
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent
      delete data.domProps.textContent
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML
      delete data.domProps.innerHTML
    }

    let iconType = 'material-icons'
    const thirdPartyIcon = iconName.indexOf('-') > -1
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'))

    data.staticClass = (`${iconType} vf-icon ${data.staticClass || ''}`).trim()
    data.attrs = data.attrs || {}

    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true
    }

    const classes = Object.assign({
      'vf-icon--disabled': props.disabled,
      'vf-icon--large': props.large,
      'vf-icon--left': props.left,
      'vf-icon--medium': props.medium,
      'vf-icon--right': props.right,
      'vf-icon--x-large': props.xLarge,
      'vf-theme--dark': props.dark,
      'vf-theme--light': props.light
    }, props.color ? Colorable.methods.addTextColorClassChecks.call(props, {}, 'color') : {
      'vf-primary--text': props.primary,
      'vf-secondary--text': props.secondary,
      'vf-success--text': props.success,
      'vf-info--text': props.info,
      'vf-warning--text': props.warning,
      'vf-error--text': props.error
    })

    const iconClasses = Object.keys(classes).filter(k => classes[k]).join(' ')
    iconClasses && (data.staticClass += ` ${iconClasses}`)

    if (thirdPartyIcon) data.staticClass += ` ${iconName}`
    else children.push(iconName)

    return h('i', data, children)
  }
}
