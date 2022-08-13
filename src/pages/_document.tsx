import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import Link from 'next/link'

class PokeDoc extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="favicon.png" rel="shortcut icon" />
          <meta property="og:title" content="" key="title" />
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;0,600;1,700&display=swap" rel="stylesheet" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta property="og:image" content={`${process.env.baseUrl}/og.png`} key="image" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@ibrahimcesar" />
          <meta name="twitter:title" content="" />
          <meta name="twitter:description" content="Just another SSR site" />
          <meta name="twitter:image" content={`${process.env.baseUrl}/og.png`} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <footer>© {new Date().getFullYear()} <Link href="https://twitter.com/ibrahimcesar"><a>Ibrahim Cesar</a></Link> | <Link href="https://updown.io/akzp"><a>PokéAPI Status</a></Link></footer>
        </body>
      </Html>
    )
  }
}

export default PokeDoc