import { styled } from '../../../stitches.config'
import { LoginForm } from '../../components'
import { useAuth } from '../../contexts/auth'

const Container = styled('div', {
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center',
})

export default function LoginPage() {
  const { signInWithEmailAndPassword } = useAuth()

  return (
    <Container>
      <LoginForm handleSubmit={signInWithEmailAndPassword} />
    </Container>
  )
}
