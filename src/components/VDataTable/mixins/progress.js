export default {
  methods: {
    genTProgress () {
      const col = this.$createElement('th', {
        staticClass: 'column',
        attrs: {
          colspan: '100%'
        }
      }, [this.genProgress()])

      return this.genTR([col], {
        staticClass: 'vf-datatable__progress'
      })
    }
  }
}
