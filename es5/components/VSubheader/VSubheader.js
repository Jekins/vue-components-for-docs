require('../../../src/stylus/components/_subheaders.styl');

import Themeable from '../../mixins/themeable';

export default {
  name: 'v-subheader',

  functional: true,

  mixins: [Themeable],

  props: {
    inset: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children,
        props = _ref.props;

    data.staticClass = ('vf-subheader ' + (data.staticClass || '')).trim();

    if (props.inset) data.staticClass += ' vf-subheader--inset';
    if (props.light) data.staticClass += ' theme--light';
    if (props.dark) data.staticClass += ' theme--dark';

    return h('li', data, children);
  }
};