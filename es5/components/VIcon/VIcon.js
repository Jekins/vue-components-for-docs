require('../../../src/stylus/components/_icons.styl');

import Themeable from '../../mixins/themeable';
import Colorable from '../../mixins/colorable';

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

  render: function render(h, _ref) {
    var props = _ref.props,
        data = _ref.data,
        _ref$children = _ref.children,
        children = _ref$children === undefined ? [] : _ref$children;

    var iconName = '';
    if (children.length) {
      iconName = children.pop().text;
    } else if (data.domProps && data.domProps.textContent) {
      iconName = data.domProps.textContent;
      delete data.domProps.textContent;
    } else if (data.domProps && data.domProps.innerHTML) {
      iconName = data.domProps.innerHTML;
      delete data.domProps.innerHTML;
    }

    var iconType = 'material-icons';
    var thirdPartyIcon = iconName.indexOf('-') > -1;
    if (thirdPartyIcon) iconType = iconName.slice(0, iconName.indexOf('-'));

    data.staticClass = (iconType + ' vf-icon ' + (data.staticClass || '')).trim();
    data.attrs = data.attrs || {};

    if (!('aria-hidden' in data.attrs)) {
      data.attrs['aria-hidden'] = true;
    }

    var classes = Object.assign({
      'vf-icon--disabled': props.disabled,
      'vf-icon--large': props.large,
      'vf-icon--left': props.left,
      'vf-icon--medium': props.medium,
      'vf-icon--right': props.right,
      'vf-icon--x-large': props.xLarge,
      'theme--dark': props.dark,
      'theme--light': props.light
    }, props.color ? Colorable.methods.addTextColorClassChecks.call(props, {}, 'color') : {
      'vf-primary--text': props.primary,
      'vf-secondary--text': props.secondary,
      'vf-success--text': props.success,
      'vf-info--text': props.info,
      'vf-warning--text': props.warning,
      'vf-error--text': props.error
    });

    var iconClasses = Object.keys(classes).filter(function (k) {
      return classes[k];
    }).join(' ');
    iconClasses && (data.staticClass += ' ' + iconClasses);

    if (thirdPartyIcon) data.staticClass += ' ' + iconName;else children.push(iconName);

    return h('i', data, children);
  }
};