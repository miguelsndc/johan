import { Header } from '../components'
import { useAuth } from '../contexts/auth'

function Home() {
  const { user, signOut } = useAuth()

  return (
    <div>
      <Header user={user} onSignOut={signOut} />
    </div>
  )
}

export default Home
