require('../../../src/stylus/components/_bottom-navs.styl');

// Mixins
import Applicationable from '../../mixins/applicationable';
import ButtonGroup from '../../mixins/button-group';
import Colorable from '../../mixins/colorable';

export default {
  name: 'v-bottom-nav',

  mixins: [Applicationable, ButtonGroup, Colorable],

  data: function data() {
    return {
      defaultColor: 'vf-primary'
    };
  },

  props: {
    absolute: Boolean,
    active: [Number, String],
    shift: Boolean,
    value: { required: false }
  },

  watch: {
    active: function active() {
      this.update();
    }
  },

  computed: {
    classes: function classes() {
      return {
        'vf-bottom-nav': true,
        'vf-bottom-nav--absolute': this.absolute,
        'vf-bottom-nav--shift': this.shift,
        'vf-bottom-nav--active': this.value
      };
    }
  },

  methods: {
    isSelected: function isSelected(i) {
      var item = this.getValue(i);
      return this.active === item;
    },
    updateApplication: function updateApplication() {
      if (!this.app) return;

      this.$vuetify.application.bottom = this.$el.clientHeight;
    },
    updateValue: function updateValue(i) {
      var item = this.getValue(i);
      this.$emit('update:active', item);
    }
  },

  render: function render(h) {
    return h('div', {
      class: this.addBackgroundColorClassChecks(this.classes),
      ref: 'content'
    }, this.$slots.default);
  }
};