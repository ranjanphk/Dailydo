// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document";


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Material Icons */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
         <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon.png" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body> 
    </Html>
  );
}
