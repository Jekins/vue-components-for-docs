var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import Positionable from './positionable';

import Stackable from './stackable';

var dimensions = {
  activator: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  content: {
    top: 0, left: 0,
    bottom: 0, right: 0,
    width: 0, height: 0,
    offsetTop: 0, scrollHeight: 0
  },
  hasWindow: false

  /**
   * Menuable
   *
   * @mixin
   *
   * Used for fixed or absolutely positioning
   * elements within the DOM
   * Can calculate X and Y axis overflows
   * As well as be manually positioned
   */
};export default {
  mixins: [Positionable, Stackable],

  data: function data() {
    return {
      absoluteX: 0,
      absoluteY: 0,
      dimensions: Object.assign({}, dimensions),
      isContentActive: false,
      pageYOffset: 0,
      stackClass: 'vf-menuable__content__active',
      stackMinZIndex: 6
    };
  },

  props: {
    activator: {
      default: null,
      validate: function validate(val) {
        return ['string', 'object'].includes(typeof val === 'undefined' ? 'undefined' : _typeof(val));
      }
    },
    allowOverflow: Boolean,
    maxWidth: {
      type: [Number, String],
      default: 'auto'
    },
    minWidth: [Number, String],
    nudgeBottom: {
      type: Number,
      default: 0
    },
    nudgeLeft: {
      type: Number,
      default: 0
    },
    nudgeRight: {
      type: Number,
      default: 0
    },
    nudgeTop: {
      type: Number,
      default: 0
    },
    nudgeWidth: {
      type: Number,
      default: 0
    },
    offsetOverflow: Boolean,
    positionX: {
      type: Number,
      default: null
    },
    positionY: {
      type: Number,
      default: null
    },
    zIndex: {
      type: [Number, String],
      default: null
    }
  },

  computed: {
    hasActivator: function hasActivator() {
      return !!this.$slots.activator || this.activator;
    }
  },

  watch: {
    disabled: function disabled(val) {
      val && this.callDeactivate();
    },
    isActive: function isActive(val) {
      if (this.disabled) return;

      val && this.callActivate() || this.callDeactivate();
    }
  },

  methods: {
    absolutePosition: function absolutePosition() {
      return {
        offsetTop: 0,
        scrollHeight: 0,
        top: this.positionY || this.absoluteY,
        bottom: this.positionY || this.absoluteY,
        left: this.positionX || this.absoluteX,
        right: this.positionX || this.absoluteX,
        height: 0,
        width: 0
      };
    },
    activate: function activate() {},
    calcLeft: function calcLeft() {
      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      // Content always has a min width
      // of its activator. This is applied
      // when the menu is shown, but not
      // reflected in the getBoundingClientRect
      // method
      var minWidth = a.width < c.width ? c.width : a.width;
      var left = this.left ? a.right - minWidth : a.left;

      if (this.offsetX) left += this.left ? -a.width : a.width;
      if (this.nudgeLeft) left -= this.nudgeLeft;
      if (this.nudgeRight) left += this.nudgeRight;

      return left;
    },
    calcTop: function calcTop() {
      this.checkForWindow();

      var a = this.dimensions.activator;
      var c = this.dimensions.content;
      var top = this.top ? a.bottom - c.height : a.top;

      if (this.offsetY) top += this.top ? -a.height : a.height;
      if (this.nudgeTop) top -= this.nudgeTop;
      if (this.nudgeBottom) top += this.nudgeBottom;

      return top + this.pageYOffset;
    },
    calcXOverflow: function calcXOverflow(left) {
      var parsedMaxWidth = isNaN(parseInt(this.maxWidth)) ? 0 : parseInt(this.maxWidth);
      var innerWidth = this.getInnerWidth();
      var maxWidth = Math.max(this.dimensions.content.width, parsedMaxWidth);
      var totalWidth = left + maxWidth;
      var availableWidth = totalWidth - innerWidth;

      if ((!this.left || this.right) && availableWidth > 0) {
        left = innerWidth - maxWidth - (innerWidth > 600 ? 30 : 12) // Account for scrollbar
        ;
      }

      if (left < 0) left = 12;

      return left;
    },
    calcYOverflow: function calcYOverflow(top) {
      var documentHeight = this.getInnerHeight();
      var toTop = this.pageYOffset + documentHeight;
      var activator = this.dimensions.activator;
      var contentHeight = this.dimensions.content.height;
      var totalHeight = top + contentHeight;
      var isOverflowing = toTop < totalHeight;

      // If overflowing bottom and offset
      if (isOverflowing && this.offsetOverflow) {
        top = this.pageYOffset + (activator.top - contentHeight);
        // If overflowing bottom
      } else if (isOverflowing && !this.allowOverflow) {
        top = toTop - contentHeight - 12;
        // If overflowing top
      } else if (top < this.pageYOffset && !this.allowOverflow) {
        top = this.pageYOffset + 12;
      }

      return top < 12 ? 12 : top;
    },
    callActivate: function callActivate() {
      this.checkForWindow();
      if (!this.hasWindow) return;

      this.activate();
    },
    callDeactivate: function callDeactivate() {
      this.isContentActive = false;

      this.deactivate();
    },
    checkForWindow: function checkForWindow() {
      this.hasWindow = typeof window !== 'undefined';

      if (this.hasWindow) {
        this.pageYOffset = this.getOffsetTop();
      }
    },
    deactivate: function deactivate() {},
    getActivator: function getActivator() {
      if (this.activator) {
        return typeof this.activator === 'string' ? document.querySelector(this.activator) : this.activator;
      }

      return this.$refs.activator.children ? this.$refs.activator.children[0] : this.$refs.activator;
    },
    getInnerHeight: function getInnerHeight() {
      if (!this.hasWindow) return 0;

      return window.innerHeight || document.documentElement.clientHeight;
    },
    getInnerWidth: function getInnerWidth() {
      if (!this.hasWindow) return 0;

      return window.innerWidth;
    },
    getOffsetTop: function getOffsetTop() {
      if (!this.hasWindow) return 0;

      return window.pageYOffset || document.documentElement.scrollTop;
    },
    measure: function measure(el, selector) {
      el = selector ? el.querySelector(selector) : el;

      if (!el) return null;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          top = _el$getBoundingClient.top,
          bottom = _el$getBoundingClient.bottom,
          left = _el$getBoundingClient.left,
          right = _el$getBoundingClient.right,
          height = _el$getBoundingClient.height,
          width = _el$getBoundingClient.width;

      return {
        offsetTop: el.offsetTop,
        scrollHeight: el.scrollHeight,
        top: top, bottom: bottom, left: left, right: right, height: height, width: width
      };
    },
    sneakPeek: function sneakPeek(cb) {
      var _this = this;

      requestAnimationFrame(function () {
        var el = _this.$refs.content;

        if (!el || _this.isShown(el)) return cb();

        el.style.display = 'inline-block';
        cb();
        el.style.display = 'none';
      });
    },
    startTransition: function startTransition() {
      var _this2 = this;

      requestAnimationFrame(function () {
        return _this2.isContentActive = true;
      });
    },
    isShown: function isShown(el) {
      return el.style.display !== 'none';
    },
    updateDimensions: function updateDimensions() {
      var _this3 = this;

      var dimensions = {};

      // Activator should already be shown
      dimensions.activator = !this.hasActivator || this.absolute ? this.absolutePosition() : this.measure(this.getActivator());

      // Display and hide to get dimensions
      this.sneakPeek(function () {
        dimensions.content = _this3.measure(_this3.$refs.content);

        _this3.dimensions = dimensions;
      });
    }
  }
};