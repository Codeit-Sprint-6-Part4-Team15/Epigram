import { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { AnimatePresence, motion } from 'framer-motion';

import '../globals.css';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimatePresence>
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
    </AnimatePresence>
  );
}
