// pages/_app.js
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noThemeRoutes = ["/", "/login", "/signup", "/logout"]; // public pages
  const isNoThemePage = noThemeRoutes.includes(router.pathname);
  const GA_MEASUREMENT_ID = "G-EGZECTH8N1";

  return (
    
    <AuthProvider>
          <Head>
      {/* Basic Meta */}
      <title>DailyDo - Smart Task Management</title>
      <meta
        name="description"
        content="DailyDo helps you organize tasks, track projects, and stay productive with ease."
      />

      {/* Open Graph / Facebook / LinkedIn / WhatsApp */}
      <meta property="og:title" content="DailyDo - Smart Task Management" />
      <meta
        property="og:description"
        content="Organize tasks, track projects, and boost productivity with DailyDo."
      />
      <meta
        property="og:image"
        content="https://heydailydo.com/og-image.png"
      />
      <meta property="og:url" content="https://heydailydo.com" />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="DailyDo - Smart Task Management" />
      <meta
        name="twitter:description"
        content="Organize tasks, track projects, and boost productivity with DailyDo."
      />
      <meta
        name="twitter:image"
        content="https://heydailydo.com/og-image.png"
      />
    </Head>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>

      {isNoThemePage ? (
        <Component {...pageProps} />
      ) : (
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      )}
    </AuthProvider>
  );
}
