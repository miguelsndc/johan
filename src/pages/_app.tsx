import type { AppProps } from 'next/app'
import { globalStyles } from '../styles/globals'
import { AuthProvider } from '../contexts/auth'

import '../config/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default MyApp
