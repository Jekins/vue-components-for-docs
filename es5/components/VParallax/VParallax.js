require('../../../src/stylus/components/_parallax.styl');

import Translatable from '../../mixins/translatable';

export default {
  name: 'v-parallax',

  mixins: [Translatable],

  data: function data() {
    return {
      isBooted: false
    };
  },


  props: {
    alt: String,
    height: {
      type: [String, Number],
      default: 500
    },
    jumbotron: Boolean,
    src: String
  },

  computed: {
    styles: function styles() {
      return {
        display: 'block',
        opacity: this.isBooted ? 1 : 0,
        transform: 'translate(-50%, ' + (this.jumbotron ? 0 : this.parallax + 'px') + ')'
      };
    }
  },

  watch: {
    parallax: function parallax() {
      this.isBooted = true;
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    init: function init() {
      var _this = this;

      if (!this.$refs.img) return;

      if (this.$refs.img.complete) {
        this.translate();
        this.listeners();
      } else {
        this.$refs.img.addEventListener('load', function () {
          _this.translate();
          _this.listeners();
        }, false);
      }
    },
    objHeight: function objHeight() {
      return this.$refs.img.naturalHeight;
    },
    elOffsetTop: function elOffsetTop() {
      return this.$el.offsetTop;
    }
  },

  render: function render(h) {
    var imgData = {
      staticClass: 'vf-parallax__image',
      'class': {
        'vf-parallax__image--jumbotron': this.jumbotron
      },
      style: this.styles,
      attrs: {
        src: this.src
      },
      ref: 'img'
    };

    if (this.alt) imgData.attrs.alt = this.alt;

    var container = h('div', {
      staticClass: 'vf-parallax__image-container'
    }, [h('img', imgData)]);

    var content = h('div', {
      staticClass: 'vf-parallax__content'
    }, this.$slots.default);

    return h('div', {
      staticClass: 'vf-parallax',
      style: {
        height: this.jumbotron ? this.normalizedHeight : this.normalizedHeight + 'px'
      },
      on: this.$listeners
    }, [container, content]);
  }
};