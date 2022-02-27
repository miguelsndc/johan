import { globalCss } from '../../stitches.config'

export const globalStyles = globalCss({
  '*': {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  body: {
    fontFamily: '$roboto',
    backgroundColor: '$black',
    color: '#fff',
    letterSpacing: '-0.035em',
  },
  code: {
    fontFamily: '$mono',
  },

  html: {
    fontSize: 14,
  },

  '@md': {
    html: { fontSize: 15 },
  },

  '@lg': {
    html: {
      fontSize: 16,
    },
  },
})
