import type { AppProps } from 'next/app'
import NProgress from 'nprogress'
import Router from 'next/router'
import { Toaster } from 'react-hot-toast'
import { globalStyles } from '../styles/globals'
import { AuthProvider } from '../contexts/auth'
import { EditorProvider } from '../contexts/editor'

import '../config/firebase'
import '../styles/nprogress.css'

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

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
