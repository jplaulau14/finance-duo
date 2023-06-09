import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../auth/AuthProvider';


function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
