require('../../../src/stylus/components/_footer.styl');

import Applicationable from '../../mixins/applicationable';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';

export default {
  name: 'v-footer',

  mixins: [Applicationable, Colorable, Themeable],

  props: {
    absolute: Boolean,
    fixed: Boolean
  },

  computed: {
    paddingLeft: function paddingLeft() {
      return this.fixed || !this.app ? 0 : this.$vuetify.application.left;
    },
    paddingRight: function paddingRight() {
      return this.fixed || !this.app ? 0 : this.$vuetify.application.right;
    }
  },

  destroyed: function destroyed() {
    if (this.app) this.$vuetify.application.bottom = 0;
  },


  methods: {
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.bottom = this.fixed ? this.$el && this.$el.clientHeight : 0;
    }
  },

  mounted: function mounted() {
    this.updateApplication();
  },
  render: function render(h) {
    this.updateApplication();

    var data = {
      staticClass: 'vf-footer',
      'class': this.addBackgroundColorClassChecks({
        'vf-footer--absolute': this.absolute,
        'vf-footer--fixed': this.fixed,
        'theme--dark': this.dark,
        'theme--light': this.light
      }),
      style: {
        paddingLeft: this.paddingLeft + 'px',
        paddingRight: this.paddingRight + 'px'
      },
      ref: 'content'
    };

    return h('footer', data, this.$slots.default);
  }
};