import type { AppProps } from 'next/app'
//import dynamic from "next/dynamic";

import PageProvider from '@/store';
// import ThemeToggle from '@components/ThemeToggle';

import '@/styles/globals.css'

//const Footer = dynamic(() => import('../components/Footer'));

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className='relative min-h-screen'>
      {/*<ThemeToggle />*/}
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
      {/*<Footer />*/}
    </main>
  )
}
