import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  height: 'auto',

  pre: {
    backgroundColor: '$gray100',
    padding: 12,
  },

  fontSize: '1rem',

  variants: {
    editMode: {
      true: {
        padding: 30,
      },
    },
  },
})
