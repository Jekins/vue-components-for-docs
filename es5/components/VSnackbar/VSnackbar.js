require('../../../src/stylus/components/_snackbars.styl');

import { VSlideYTransition, VSlideYReverseTransition } from '../transitions';

import Colorable from '../../mixins/colorable';
import Toggleable from '../../mixins/toggleable';

export default {
  name: 'v-snackbar',

  components: {
    VSlideYTransition: VSlideYTransition,
    VSlideYReverseTransition: VSlideYReverseTransition
  },

  mixins: [Colorable, Toggleable],

  data: function data() {
    return {
      activeTimeout: {}
    };
  },


  props: {
    absolute: Boolean,
    bottom: Boolean,
    left: Boolean,
    multiLine: Boolean,
    right: Boolean,
    top: Boolean,
    // TODO: change this to closeDelay to match other API in delayable.js
    timeout: {
      type: Number,
      default: 6000
    },
    vertical: Boolean
  },

  computed: {
    classes: function classes() {
      return this.addBackgroundColorClassChecks({
        'vf-snack--active': this.isActive,
        'vf-snack--absolute': this.absolute,
        'vf-snack--bottom': this.bottom || !this.top,
        'vf-snack--left': this.left,
        'vf-snack--multi-line': this.multiLine && !this.vertical,
        'vf-snack--right': this.right,
        'vf-snack--top': this.top,
        'vf-snack--vertical': this.vertical
      });
    },
    computedTransition: function computedTransition() {
      return this.top ? 'v-slide-y-transition' : 'v-slide-y-reverse-transition';
    }
  },

  watch: {
    isActive: function isActive() {
      this.setTimeout();
    }
  },

  methods: {
    setTimeout: function (_setTimeout) {
      function setTimeout() {
        return _setTimeout.apply(this, arguments);
      }

      setTimeout.toString = function () {
        return _setTimeout.toString();
      };

      return setTimeout;
    }(function () {
      var _this = this;

      clearTimeout(this.activeTimeout);

      if (this.isActive && this.timeout) {
        this.activeTimeout = setTimeout(function () {
          _this.isActive = false;
        }, this.timeout);
      }
    })
  },

  mounted: function mounted() {
    this.setTimeout();
  },
  render: function render(h) {
    var children = [];

    if (this.isActive) {
      children.push(h('div', {
        staticClass: 'vf-snack__content'
      }, this.$slots.default));
    }

    return h('div', {
      staticClass: 'snack',
      'class': this.classes,
      on: this.$listeners
    }, [h(this.computedTransition, children)]);
  }
};