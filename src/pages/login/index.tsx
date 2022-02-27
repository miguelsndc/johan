import { useRouter } from 'next/router'
import { styled } from '../../../stitches.config'
import { LoginForm } from '../../components'
import { useAuth } from '../../contexts/auth'

const Container = styled('div', {
  background: '$gray100',
  height: '100vh',
  padding: '0 1rem',
  display: 'grid',
  placeItems: 'center',
})

export default function LoginPage() {
  const { signInWithEmailAndPassword } = useAuth()
  const router = useRouter()

  const handleSubmit = (values: any) =>
    signInWithEmailAndPassword(values).then(() => {
      router.push('/')
    })

  return (
    <Container>
      <LoginForm handleSubmit={handleSubmit} />
    </Container>
  )
}
