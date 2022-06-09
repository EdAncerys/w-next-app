import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // --------------------------------------------------------------------------------
  // 📌  NEXT.js APP COMPONENT
  // --------------------------------------------------------------------------------

  return <Component {...pageProps} />;
}

export default MyApp;
