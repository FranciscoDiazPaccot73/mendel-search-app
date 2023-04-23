import type { AppProps } from 'next/app'

import PageProvider from '@store/index';

import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className='relative min-h-screen'>
      <PageProvider>
        <Component {...pageProps} />
      </PageProvider>
    </main>
  )
}
