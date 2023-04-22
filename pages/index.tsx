import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head'
import { useContext } from 'react';
import { motion } from 'framer-motion';

import { getInitialValues } from '@/services'
import { getInitialSearchValues } from '@/utils';
import { BookCriticalInfoClient } from './types';
import Card from '@/components/Card';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';

import { PageContext } from '@/store';
import Loader from '@/components/Loader';

const META = {
  TITLE: 'Mendel Frontend Challenge',
  DESCRIPTION: 'Francisco Diaz Paccot | Mendel Frontend Challenge',
}

interface MyQuery {
  q?: string;
}

type ServerSideProps = {
  books: BookCriticalInfoClient[]
  type: string 
  totalBooks?: number
  offset?: number
  limit?: number
}

type HomeProps = {
  list: ServerSideProps
  initialSearchValue?: string
}

const Home: NextPage<HomeProps> = ({ list = {}, initialSearchValue }) => {
  const { state: { content, isFetching } } = useContext(PageContext);

  const { books, type, totalBooks } = content ?? list;
  const title = type === 'trendings' ? 'Tendencias de hoy' : 'Busqueda: '

  return (
    <div className="flex min-h-screen flex-col items-center justify-between py-28 px-10 max-w-6xl mx-auto">
      <Head>
        <title>{META.TITLE}</title>
        <meta name="description" content={META.DESCRIPTION} />
        <meta name="title" content={META.TITLE} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <SearchBar defaultSearch={initialSearchValue} />
        <Footer />
      </section>
      <h1 className='self-start text-2xl mb-6 font-bold md:text-3xl md:flex md:items-end md:gap-3 w-full'>
        {title}
        {initialSearchValue ? <div className='text-xl text-dark-tertiary font-normal dark:text-light-tertiary md:text-2xl'>"{initialSearchValue}"</div> : null }
        {totalBooks ? <p className='ml-auto text-xs opacity-70 font-normal w-full text-end md:w-auto'>Libros totales: {totalBooks}</p> : null}
      </h1>
      <section className="relative w-full mb-32">
        <motion.div
        className='grid gap-6 text-center md:grid-cols-cards'
          animate={{
            scale: isFetching ? 0.95 : 1,
            opacity: isFetching ? 0.5 : 1
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {books?.map((book: BookCriticalInfoClient) => <Card key={book.key} book={book} />)}
        </motion.div>
        {isFetching ? <Loader /> : null}
      </section>       
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query as MyQuery;
  const initialSearchValue = getInitialSearchValues(q);

  const list = await getInitialValues(q);
  
  return {
    props: {
      list,
      initialSearchValue,
    }
  }
}

export default Home;
