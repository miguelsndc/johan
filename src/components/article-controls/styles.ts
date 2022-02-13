import { styled } from '../../../stitches.config'

const Container = styled('div', {
  position: 'absolute',
  top: 20,
  right: 40,
  display: 'flex',
  gap: '1rem',
})

const ButtonDefaults = styled('button', {
  all: 'unset',
  display: 'block',
  color: '#fff',
  fontWeight: 400,
  textTransform: 'capitalize',
  cursor: 'pointer',
  borderRadius: 6,
  width: '3.75rem',
  height: '2.25rem',
  textAlign: 'center',
  transition: 'background .2s',
})

const SaveButton = styled(ButtonDefaults, {
  background: '$gray600',
  '&:hover': {
    background: '$gray700',
  },
})

const PostButton = styled(ButtonDefaults, {
  background: '$purple700',
  '&:hover': {
    background: '$purple800',
  },
})

export { Container, SaveButton, PostButton }
