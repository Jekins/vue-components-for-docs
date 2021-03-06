require('../../../src/stylus/components/_menus.styl');

// Mixins
import Delayable from '../../mixins/delayable';
import Dependent from '../../mixins/dependent';
import Detachable from '../../mixins/detachable';
import Menuable from '../../mixins/menuable.js';
import Toggleable from '../../mixins/toggleable';

// Component level mixins
import Activator from './mixins/menu-activator';
import Generators from './mixins/menu-generators';
import Keyable from './mixins/menu-keyable';
import Position from './mixins/menu-position';

// Directives
import ClickOutside from '../../directives/click-outside';
import Resize from '../../directives/resize';

export default {
  name: 'v-menu',

  mixins: [Activator, Dependent, Delayable, Detachable, Generators, Keyable, Menuable, Position, Toggleable],

  directives: {
    ClickOutside: ClickOutside,
    Resize: Resize
  },

  data: function data() {
    return {
      defaultOffset: 8,
      maxHeightAutoDefault: '200px',
      startIndex: 3,
      stopIndex: 0,
      hasJustFocused: false,
      resizeTimeout: null
    };
  },


  props: {
    auto: Boolean,
    closeOnClick: {
      type: Boolean,
      default: true
    },
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    fullWidth: Boolean,
    maxHeight: { default: 'auto' },
    offsetX: Boolean,
    offsetY: Boolean,
    openOnClick: {
      type: Boolean,
      default: true
    },
    openOnHover: Boolean,
    origin: {
      type: String,
      default: 'top left'
    },
    transition: {
      type: [Boolean, String],
      default: 'menu-transition'
    }
  },

  computed: {
    calculatedLeft: function calculatedLeft() {
      var left = this.calcLeft;
      if (this.auto) left = this.calcLeftAuto;

      return this.calcXOverflow(left()) + 'px';
    },
    calculatedMaxHeight: function calculatedMaxHeight() {
      return this.auto ? '200px' : isNaN(this.maxHeight) ? this.maxHeight : this.maxHeight + 'px';
    },
    calculatedMaxWidth: function calculatedMaxWidth() {
      return isNaN(this.maxWidth) ? this.maxWidth : this.maxWidth + 'px';
    },
    calculatedMinWidth: function calculatedMinWidth() {
      if (this.minWidth) {
        return isNaN(this.minWidth) ? this.minWidth : this.minWidth + 'px';
      }

      var minWidth = this.dimensions.activator.width + this.nudgeWidth + (this.auto ? 16 : 0);

      var calculatedMaxWidth = isNaN(parseInt(this.calculatedMaxWidth)) ? minWidth : parseInt(this.calculatedMaxWidth);

      return Math.min(calculatedMaxWidth, minWidth) + 'px';
    },
    calculatedTop: function calculatedTop() {
      var top = this.auto ? this.calcTopAuto : this.calcTop;

      return this.calcYOverflow(top()) + 'px';
    },
    styles: function styles() {
      return {
        maxHeight: this.calculatedMaxHeight,
        minWidth: this.calculatedMinWidth,
        maxWidth: this.calculatedMaxWidth,
        top: this.calculatedTop,
        left: this.calculatedLeft,
        transformOrigin: this.origin,
        zIndex: this.zIndex || this.activeZIndex
      };
    }
  },

  watch: {
    activator: function activator(newActivator, oldActivator) {
      this.removeActivatorEvents(oldActivator);
      this.addActivatorEvents(newActivator);
    },
    isContentActive: function isContentActive(val) {
      this.hasJustFocused = val;
    }
  },

  methods: {
    activate: function activate() {
      // This exists primarily for v-select
      // helps determine which tiles to activate
      this.getTiles();
      // Update coordinates and dimensions of menu
      // and its activator
      this.updateDimensions();
      // Start the transition
      requestAnimationFrame(this.startTransition);
      // Once transitioning, calculate scroll position
      setTimeout(this.calculateScroll, 50);
    },
    onResize: function onResize() {
      if (!this.isActive) return;

      // Account for screen resize
      // and orientation change
      this.$refs.content.offsetWidth;
      this.updateDimensions();

      // When resizing to a smaller width
      // content width is evaluated before
      // the new activator width has been
      // set, causing it to not size properly
      // hacky but will revisit in the future
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.updateDimensions, 100);
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'vf-menu',
      class: {
        'vf-menu--disabled': this.disabled
      },
      style: {
        display: this.fullWidth ? 'block' : 'inline-block'
      },
      directives: [{
        name: 'resize',
        value: {
          debounce: 500,
          value: this.onResize
        }
      }],
      on: {
        keydown: this.changeListIndex
      }
    };

    return h('div', data, [this.genActivator(), this.genTransition()]);
  }
};