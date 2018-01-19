import Colorable from '../../mixins/colorable';

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  data: function data() {
    return {
      defaultColor: 'vf-accent'
    };
  },

  render: function render(h) {
    return h('li', {
      staticClass: 'vf-tabs__slider',
      class: this.addBackgroundColorClassChecks()
    });
  }
};