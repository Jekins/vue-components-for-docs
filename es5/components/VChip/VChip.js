require('../../../src/stylus/components/_chips.styl');

import VIcon from '../VIcon';
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';
import Toggleable from '../../mixins/toggleable';

export default {
  name: 'v-chip',

  components: {
    VIcon: VIcon
  },

  mixins: [Colorable, Themeable, Toggleable],

  props: {
    close: Boolean,
    disabled: Boolean,
    label: Boolean,
    outline: Boolean,
    // Used for selects/tagging
    selected: Boolean,
    small: Boolean,
    textColor: String,
    value: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    classes: function classes() {
      var classes = this.addBackgroundColorClassChecks({
        'vf-chip--disabled': this.disabled,
        'vf-chip--selected': this.selected,
        'vf-chip--label': this.label,
        'vf-chip--outline': this.outline,
        'vf-chip--small': this.small,
        'vf-chip--removable': this.close,
        'theme--light': this.light,
        'theme--dark': this.dark
      });

      return this.textColor || this.outline ? this.addTextColorClassChecks(classes, this.textColor ? 'textColor' : 'color') : classes;
    }
  },

  methods: {
    genClose: function genClose(h) {
      var _this = this;

      var data = {
        staticClass: 'vf-chip__close',
        on: {
          click: function click(e) {
            e.stopPropagation();

            _this.$emit('input', false);
          }
        }
      };

      return h('div', data, [h(VIcon, 'cancel')]);
    },
    genContent: function genContent(h) {
      var children = [this.$slots.default];

      this.close && children.push(this.genClose(h));

      return h('span', {
        staticClass: 'vf-chip__content'
      }, children);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'vf-chip',
      'class': this.classes,
      attrs: { tabindex: this.disabled ? -1 : 0 },
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      on: this.$listeners
    };

    return h('span', data, [this.genContent(h)]);
  }
};