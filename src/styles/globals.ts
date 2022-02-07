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
  },
  code: {
    fontFamily: '$mono',
  },
})
