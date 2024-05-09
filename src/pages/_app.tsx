import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import { Layout } from '../components/common/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>WalletConnect v2 Test</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}
