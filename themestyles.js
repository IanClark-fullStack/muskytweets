module.exports = {
  purge: [],
  darkMode: true, // or 'media' or 'class'
  theme: {
    backgroundColor: theme => ({
      ...theme('Colors'),
      'primary': '#FAFAFA',
    })
    
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
