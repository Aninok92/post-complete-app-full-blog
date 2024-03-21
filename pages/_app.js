import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Head>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </Head>
          <Component {...pageProps} />
      </Layout>
      </SessionProvider>

  )
}

export default MyApp
