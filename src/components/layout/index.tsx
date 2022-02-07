import { ReactNode } from 'react'
import Header from '../header'
import { useAuth } from '../../contexts/auth'

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { user, signOut } = useAuth()

  return (
    <>
      <Header user={user} onSignOut={signOut} />
      <main>{children}</main>
    </>
  )
}
