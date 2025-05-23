import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Providers from './Providers';
import Navbar from '@/components/Navbar';
import SearchBox from '@/components/SearchBox';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nyigana movies',
  description: 'This is a movie web app made by Royden Melchiory',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense>
        <Providers>
          <Header />
          <Navbar />
          <SearchBox />
          {children}
        </Providers>
        </Suspense>
      </body>
    </html>
  );
}
