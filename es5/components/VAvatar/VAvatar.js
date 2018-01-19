require('../../../src/stylus/components/_avatars.styl');

export default {
  name: 'v-avatar',

  functional: true,

  props: {
    size: {
      type: String,
      default: '48px'
    },
    tile: Boolean
  },

  render: function render(h, _ref) {
    var data = _ref.data,
        props = _ref.props,
        children = _ref.children;

    data.staticClass = ('vf-avatar ' + (data.staticClass || '')).trim();
    data.style = data.style || {};

    if (props.tile) data.staticClass += ' vf-avatar--tile';

    data.style.height = props.size;
    data.style.width = props.size;

    return h('div', data, children);
  }
};