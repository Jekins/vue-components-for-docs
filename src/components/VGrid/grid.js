export default function Grid (name) {
  return {
    name: `v-${name}`,

    functional: true,

    props: {
      id: String,
      tag: {
        type: String,
        default: 'div'
      }
    },

    render: (h, { props, data, children }) => {
      data.staticClass = (`vf-${name} ${(data.staticClass || '').split(' ').map(x => 'vf-' + x)}`).trim()

      if (data.attrs) {
        const classes = []

        Object.keys(data.attrs).forEach(key => {
          const value = data.attrs[key]

          if (typeof value === 'string') classes.push('vf-' + key)
          else if (value) classes.push('vf-' + key)
        })

        if (classes.length) data.staticClass += ` ${classes.join(' ')}`
        delete data.attrs
      }

      if (props.id) {
        data.domProps = data.domProps || {}
        data.domProps.id = props.id
      }

      return h(props.tag, data, children)
    }
  }
}
