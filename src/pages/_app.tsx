import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { globalStyles } from '../styles/globals'
import { AuthProvider } from '../contexts/auth'

import '../config/firebase'
import Layout from '../components/layout'

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
