import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast'
import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'
import Layout from '@/components/Layout'
import LoginModal from '@/components/Modal/LoginModel'
import RegisterModal from '@/components/Modal/RegisterModal'
import EditModal from '@/components/Modal/EditModel'


export default function App({ Component, pageProps }: AppProps) {
  return (
  <SessionProvider session={pageProps.session}>
    <EditModal/>
    <Toaster />
    <RegisterModal />
    <LoginModal/>
    <Layout>
      <Component {...pageProps} />
    </Layout>

  </SessionProvider>
  )
}
