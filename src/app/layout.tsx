import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './globals.css';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Epigram',
  description: '명언, 글귀 공유 사이트',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
        <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <link rel="icon" href="./favicon.ico" sizes="any" />
        <div>
          <Header />
          <ToastContainer autoClose={2000} />
          {children}
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
