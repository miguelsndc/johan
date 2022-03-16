import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { globalStyles } from '../styles/globals'
import { AuthProvider } from '../contexts/auth'
import { EditorProvider } from '../contexts/editor'

import '../config/firebase'

function MyApp({ Component, pageProps }: AppProps) {
  globalStyles()

  return (
    <>
      <Toaster />
      <AuthProvider>
        <EditorProvider>
          <Component {...pageProps} />
        </EditorProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp
