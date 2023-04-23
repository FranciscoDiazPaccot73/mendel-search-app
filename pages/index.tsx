import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head'
import { useContext, useEffect } from 'react';

import Footer from '@components/Footer';
import SearchBar from '@components/SearchBar';
import Loader from '@components/Loader';
import Content from '@components/Content';

import { getInitialValues } from '@services/index'
import { PageContext } from '@store/index';
import { setInitialValues } from '@store/actions';
import { getInitialSearchValues } from '@utils/index';
import { BookCriticalInfoClient } from './types';

const META = {
  TITLE: 'Mendel Frontend Challenge',
  DESCRIPTION: 'Francisco Diaz Paccot | Mendel Frontend Challenge',
}

interface MyQuery {
  q?: string;
}

export type ServerSideProps = {
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
  const { dispatch, state: { content, isFetching, searchValue } } = useContext(PageContext);

  useEffect(() => {
    if (initialSearchValue) {
      setInitialValues(dispatch, initialSearchValue, list)
    }
  }, [])

  const { books, type, totalBooks } = content ?? list;
  const searchBarInputValue = searchValue ?? initialSearchValue;
  const title = type === 'trendings' ? 'Tendencias de hoy' : 'Busqueda: '

  return (
    <div id="main-container" className="flex min-h-screen flex-col items-center justify-between py-28 px-10 max-w-6xl mx-auto">
      <Head>
        <title>{META.TITLE}</title>
        <meta name="description" content={META.DESCRIPTION} />
        <meta name="title" content={META.TITLE} />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <section className="z-30 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <SearchBar defaultSearch={initialSearchValue} />
        <Footer />
      </section>
      <h1 className='self-start text-2xl mb-6 font-bold md:text-3xl md:flex md:items-end md:gap-3 w-full'>
        {title}
        {searchBarInputValue ? <div className='text-xl font-normal text-light-tertiary md:text-2xl'>"{searchBarInputValue}"</div> : null }
        {totalBooks ? <p className='ml-auto text-xs opacity-70 font-normal w-full text-end md:w-auto'>Libros totales: {totalBooks}</p> : null}
      </h1>
      <section className="relative w-full mb-32">
        <Content books={books} totalBooks={totalBooks} />
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
