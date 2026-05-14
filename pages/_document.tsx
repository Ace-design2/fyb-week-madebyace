import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Memories from our FYB Week in Funaab, April 2026."
          />
          <meta property="og:site_name" content="FYB Week Funaab" />
          <meta
            property="og:description"
            content="Memories from our FYB Week in Funaab, April 2026."
          />
          <meta property="og:title" content="FYB Week Funaab - April 2026" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="FYB Week Funaab - April 2026" />
          <meta
            name="twitter:description"
            content="Memories from our FYB Week in Funaab, April 2026."
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
