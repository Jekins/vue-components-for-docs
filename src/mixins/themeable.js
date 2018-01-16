export default {
  props: {
    dark: Boolean,
    light: Boolean
  },

  computed: {
    themeClasses () {
      return {
        'vf-theme--light': this.light,
        'vf-theme--dark': this.dark
      }
    }
  }
}
