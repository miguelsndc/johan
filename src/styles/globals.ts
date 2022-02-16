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
    color: '$gray900',
    letterSpacing: '-0.035em',
  },
  code: {
    fontFamily: '$mono',
  },

  html: {
    fontSize: '87.5%',
  },

  '@md': {
    html: { fontSize: '93.75%' },
  },

  '@lg': {
    html: {
      fontSize: '100%',
    },
  },
})
