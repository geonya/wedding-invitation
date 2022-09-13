import '../styles/globals.css'
import '../styles/sakura.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import Sakura from '../lib/sakura'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      new Sakura('body')
    }
  }, [])
  return (
    <>
      <Head>
        <title>Geony ❤️ Bora Wedding Invitation</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          breakpoints: {
            xs: 380,
            sm: 500,
            md: 800,
            lg: 1000,
            xl: 1200,
          },
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default MyApp
