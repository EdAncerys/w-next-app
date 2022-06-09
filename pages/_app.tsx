import '../styles/globals.css';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  // --------------------------------------------------------------------------------
  // 📌  NEXT.js APP COMPONENT
  // --------------------------------------------------------------------------------

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
