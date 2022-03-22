import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  flex: '0 0 47%',
  fontSize: '1rem',
  '& .cm-editor': {
    height: 'calc(100vh - 7vh)',
    paddingLeft: '1.5rem',
  },

  '.cm-scroller::-webkit-scrollbar, .cm-scroller::-webkit-scrollbar-track': {
    background: 'transparent',
    width: 10,
  },
  '.cm-scroller::-webkit-scrollbar-thumb': {
    borderRadius: 8,
    background: '$gray500',
    height: 20,
  },

  variants: {
    fullHeight: {
      true: {
        '& .cm-editor': {
          height: '100vh',
          paddingLeft: '1rem',
        },
      },
    },
  },
})
