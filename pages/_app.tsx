import '../styles/sakura.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider } from '@mantine/core'
import Sakura from '../lib/sakura'
import { useEffect, useState } from 'react'
import GlobalStyles from '../styles/GlobalStyles'

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true)

  // mount loading
  useEffect(() => {
    setLoading(false)
  }, [])
  //flower
  useEffect(() => {
    if (typeof window !== 'undefined' && !loading) {
      new Sakura('main')
    }
  }, [loading])

  // Kakao share init
  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY)
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
            xs: 400,
            sm: 500,
            md: 800,
            lg: 1000,
            xl: 1200,
          },
        }}
      >
        <GlobalStyles />

        <div
          id='main'
          style={{
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {loading ? <>Loading...</> : <Component {...pageProps} />}
        </div>
      </MantineProvider>
    </>
  )
}

export default MyApp
