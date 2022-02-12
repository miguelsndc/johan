import { styled } from '../../../stitches.config'

export const Container = styled('div', {
  flex: '0 0 50%',
  fontSize: '1rem',
  '& .cm-editor': {
    height: 'calc(100vh - 7vh)',
    paddingLeft: '1rem',
  },
})
