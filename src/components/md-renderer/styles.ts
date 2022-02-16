import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  flex: '0 0 50%',
  padding: 30,
  overflow: 'auto',
  height: 'calc(100vh - 7vh)',

  pre: {
    backgroundColor: '$gray100',
    padding: 12,
  },

  variants: {
    zenMode: {
      true: {
        height: '100vh',
      },
    },
  },
})
