export default {
  functional: true,

  name: 'v-list-tile-action',

  render: function render(h, _ref) {
    var data = _ref.data,
        children = _ref.children;

    data.staticClass = data.staticClass ? 'vf-list__tile__action vf-' + (data.staticClass || '') : 'vf-list__tile__action';
    if ((children || []).length > 1) data.staticClass += ' vf-list__tile__action--stack';

    return h('div', data, children);
  }
};