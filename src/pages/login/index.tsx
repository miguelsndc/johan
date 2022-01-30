import { LoginForm } from '../../components'
import { useAuth } from '../../contexts/auth'

export default function LoginPage() {
  const { signInWithEmailAndPassword } = useAuth()

  return (
    <div>
      <LoginForm handleSubmit={signInWithEmailAndPassword} />
    </div>
  )
}
