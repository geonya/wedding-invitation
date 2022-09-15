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

  // Facebook share init
  useEffect(() => {
    ;(function (d: any, s: any, id: any) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0'
      fjs.parentNode.insertBefore(js, fjs)
    })(document, 'script', 'facebook-jssdk')
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
