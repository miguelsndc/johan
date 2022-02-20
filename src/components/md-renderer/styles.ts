import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  flex: '0 0 50%',

  pre: {
    backgroundColor: '$gray100',
    padding: 12,
  },

  fontSize: '1rem',

  '&::-webkit-scrollbar, &::-webkit-scrollbar-track': {
    background: 'transparent',
    width: 10,
  },
  '&::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    background: '$gray500',
    height: 20,
  },

  variants: {
    fullHeight: {
      true: {
        height: '100vh',
      },
    },

    fitted: {
      true: {
        height: 'calc(100vh - 7vh)',
      },
    },

    editMode: {
      true: {
        padding: 30,
        overflow: 'auto',
      },
    },
  },
})
