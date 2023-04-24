import { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head'
import { useContext, useEffect } from 'react';
import {  useQuery } from '@tanstack/react-query'

import Footer from '@components/Footer';
import SearchBar from '@components/SearchBar';
import Loader from '@components/Loader';
import Content from '@components/Content';

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
  q?: string
}

const Home: NextPage<HomeProps> = ({ initialSearchValue, q }) => {
  const { dispatch, state: { content, isFetching, searchValue } } = useContext(PageContext);
  const url = `/api${q ? `?q=${q}` : ''}`

  const { isLoading, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () => fetch(url).then((res) => res.json())
  })

  useEffect(() => {
    if (data) {
      setInitialValues(dispatch, initialSearchValue, data)
    }
  }, [data])

  const { books, type, totalBooks } = content || {};
  const searchBarInputValue = searchValue ?? initialSearchValue;
  const title = type === 'trendings' ? 'Tendencias de hoy' : 'Busqueda: '

  return (
    <div id="main-container" className="flex min-h-screen flex-col items-start justify-between py-28 px-10 max-w-6xl mx-auto">
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
      {books ? (
        <h1 className='self-start text-2xl mb-6 font-bold md:text-3xl md:flex md:items-end md:gap-3 w-full'>
          {books ? title : null}
          {searchBarInputValue ? <div className='text-xl font-normal text-light-tertiary md:text-2xl'>"{searchBarInputValue}"</div> : null }
          {totalBooks ? <p className='ml-auto text-xs opacity-70 font-normal w-full text-end md:w-auto'>Libros totales: {totalBooks}</p> : null}
        </h1>
      ) : null}
      <section className="relative w-full mb-32">
        {books && <Content books={books} totalBooks={totalBooks} />}
      </section>       
      {isFetching || isLoading ? <Loader /> : null}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { q } = query as MyQuery;
  const initialSearchValue = getInitialSearchValues(q);
  const props = q ? { initialSearchValue, q } : { initialSearchValue };
  
  return {
    props
  }
}

export default Home;
