import { Suspense } from 'react';

import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

import '../globals.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyApp({ Component, pageProps, router }: AppProps) {
  const isSearchPage = router.pathname === '/search';

  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (err) => {
          console.error('SWR Error:', err);
        },
      }}
    >
      {isSearchPage ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Component {...pageProps} />
        </Suspense>
      ) : (
        <Component {...pageProps} />
      )}
    </SWRConfig>
  );
}
