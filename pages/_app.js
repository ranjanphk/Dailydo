import { ThemeProvider } from "next-themes";
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext'; // ✅ Import AuthProvider

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  );
}
