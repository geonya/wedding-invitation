import '../styles/sakura.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, ScrollArea } from '@mantine/core'
import Sakura from '../lib/sakura'
import { useEffect } from 'react'
import GlobalStyles from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  //flower
  useEffect(() => {
    if (typeof window !== 'undefined') {
      new Sakura('main')
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
        <GlobalStyles />
        <div id='main' style={{ overflow: 'hidden', position: 'relative' }}>
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </>
  )
}

export default MyApp
