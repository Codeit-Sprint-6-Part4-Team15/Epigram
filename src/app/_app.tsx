import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '../globals.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error('SWR Error:', err);
        },
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}

export default MyApp;
