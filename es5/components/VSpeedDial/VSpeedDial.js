function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

require('../../../src/stylus/components/_speed-dial.styl');

import Toggleable from '../../mixins/toggleable';
import Positionable from '../../mixins/positionable';

import ClickOutside from '../../directives/click-outside';

export default {
  name: 'v-speed-dial',

  mixins: [Positionable, Toggleable],

  directives: { ClickOutside: ClickOutside },

  props: {
    direction: {
      type: String,
      default: 'top',
      validator: function validator(val) {
        return ['top', 'right', 'bottom', 'left'].includes(val);
      }
    },
    hover: Boolean,
    transition: {
      type: String,
      default: 'scale-transition'
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'vf-speed-dial': true,
        'vf-speed-dial--top': this.top,
        'vf-speed-dial--right': this.right,
        'vf-speed-dial--bottom': this.bottom,
        'vf-speed-dial--left': this.left,
        'vf-speed-dial--absolute': this.absolute,
        'vf-speed-dial--fixed': this.fixed
      }, 'vf-speed-dial--direction-' + this.direction, true);
    }
  },

  render: function render(h) {
    var _this = this;

    var children = [];
    var data = {
      'class': this.classes,
      directives: [{
        name: 'click-outside'
      }],
      on: {
        click: function click() {
          return _this.isActive = !_this.isActive;
        }
      }
    };

    if (this.hover) {
      data.on.mouseenter = function () {
        return _this.isActive = true;
      };
      data.on.mouseleave = function () {
        return _this.isActive = false;
      };
    }

    if (this.isActive) {
      children = (this.$slots.default || []).map(function (b, i) {
        b.key = i;

        return b;
      });
    }

    var list = h('transition-group', {
      'class': 'vf-speed-dial__list',
      props: {
        name: this.transition,
        tag: 'div'
      }
    }, children);

    return h('div', data, [this.$slots.activator, list]);
  }
};