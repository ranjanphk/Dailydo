// pages/_app.js
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noThemeRoutes = ["/", "/login", "/signup", "/logout"]; // public pages
  const isNoThemePage = noThemeRoutes.includes(router.pathname);
  const GA_MEASUREMENT_ID = "G-EGZECTH8N1";

  return (
    <AuthProvider>
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
