import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head>
          <script defer src='https://developers.kakao.com/sdk/js/kakao.js' />
          <meta property='og:url' content='https://geony-bora.vercel.app/' />
          <meta
            property='og:title'
            content='한건희 ❤️ 이보라 우리 결혼합니다!'
          />
          <meta property='og:type' content='website' />
          <meta
            property='og:image'
            content='https://geony-bora.vercel.app/pictures/10.jpg'
          />
          <meta
            property='og:description'
            content='11월 12일 (토) 11시 아벤티움 웨딩홀'
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
