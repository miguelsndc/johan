import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { globalStyles } from '../styles/globals'
import { AuthProvider } from '../contexts/auth'
import { Layout } from '../components'

import '../config/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Toaster />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  )
}

export default MyApp
