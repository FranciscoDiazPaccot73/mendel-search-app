import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import PageProvider from '@store/index';

import '@/styles/globals.css'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <main className='relative min-h-screen'>
        <PageProvider>
          <Component {...pageProps} />
        </PageProvider>
      </main>
    </QueryClientProvider>
  )
}
