import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { getCssText } from '../../stitches.config'

class MyDocument extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link
            rel='preconnect'
            href='https://fonts.gstatic.com'
            crossOrigin='true'
          />
          <link
            href='https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700;800&family=Roboto:wght@300;400;500;700;900&display=swap'
            rel='stylesheet'
          />
          <style
            id='stitches'
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: getCssText() }}
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

export default MyDocument
