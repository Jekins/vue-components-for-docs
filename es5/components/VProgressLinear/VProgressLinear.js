function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../../../src/stylus/components/_progress-linear.styl');

import Colorable from '../../mixins/colorable';

import { VFadeTransition, VSlideXTransition } from '../transitions';

export default {
  name: 'v-progress-linear',

  components: {
    VFadeTransition: VFadeTransition,
    VSlideXTransition: VSlideXTransition
  },

  mixins: [Colorable],

  props: {
    active: {
      type: Boolean,
      default: true
    },
    backgroundColor: {
      type: String,
      default: null
    },
    backgroundOpacity: {
      type: [Number, String],
      default: null
    },
    bufferValue: {
      type: [Number, String],
      default: 100
    },
    color: {
      type: String,
      default: 'vf-primary'
    },
    height: {
      type: [Number, String],
      default: 7
    },
    indeterminate: Boolean,
    query: Boolean,
    value: {
      type: [Number, String],
      default: 0
    }
  },

  computed: {
    styles: function styles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      if (!this.indeterminate && parseInt(this.bufferValue, 10) !== 100) {
        styles.width = this.bufferValue + '%';
      }

      return styles;
    },
    effectiveWidth: function effectiveWidth() {
      if (!this.bufferValue) {
        return 0;
      }

      return this.value * 100 / this.bufferValue;
    },
    bufferStyles: function bufferStyles() {
      var styles = {};

      if (!this.active) {
        styles.height = 0;
      }

      return styles;
    },
    backgroundStyle: function backgroundStyle() {
      var backgroundOpacity = this.backgroundOpacity == null ? this.backgroundColor ? 1 : 0.3 : parseFloat(this.backgroundOpacity);

      return {
        height: this.active ? 'auto' : 0,
        opacity: backgroundOpacity,
        width: this.bufferValue + '%'
      };
    }
  },

  methods: {
    genDeterminate: function genDeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'vf-progress-linear__bar__determinate',
        class: this.addBackgroundColorClassChecks(),
        style: {
          width: this.effectiveWidth + '%'
        }
      });
    },
    genBar: function genBar(h, name) {
      return h('div', {
        staticClass: 'vf-progress-linear__bar__indeterminate',
        class: this.addBackgroundColorClassChecks(_defineProperty({}, name, true))
      });
    },
    genIndeterminate: function genIndeterminate(h) {
      return h('div', {
        ref: 'front',
        staticClass: 'vf-progress-linear__bar__indeterminate',
        class: {
          'vf-progress-linear__bar__indeterminate--active': this.active
        }
      }, [this.genBar(h, 'long'), this.genBar(h, 'short')]);
    }
  },

  render: function render(h) {
    var fade = h('v-fade-transition', [this.indeterminate && this.genIndeterminate(h)]);
    var slide = h('v-slide-x-transition', [!this.indeterminate && this.genDeterminate(h)]);

    var bar = h('div', {
      staticClass: 'vf-progress-linear__bar',
      style: this.styles
    }, [fade, slide]);
    var background = h('div', {
      staticClass: 'vf-progress-linear__background',
      class: [this.backgroundColor || this.color],
      style: this.backgroundStyle
    });

    return h('div', {
      staticClass: 'vf-progress-linear',
      class: {
        'vf-progress-linear--query': this.query
      },
      style: {
        height: this.height + 'px'
      },
      on: this.$listeners
    }, [background, bar]);
  }
};