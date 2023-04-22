import type { AppProps } from 'next/app'

import PageProvider from '@/store';
// import ThemeToggle from '@components/ThemeToggle';

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className='relative min-h-screen'>
      {/*<ThemeToggle />*/}
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </main>
  )
}
