// pages/_app.js
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../context/AuthContext";
import { useRouter } from "next/router";
import "../styles/globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const noThemeRoutes = ["/", "/login", "/signup", "/logout"]; // public pages
  const isNoThemePage = noThemeRoutes.includes(router.pathname);

  return (
    <AuthProvider>
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
