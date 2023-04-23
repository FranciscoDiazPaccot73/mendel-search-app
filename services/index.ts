import axios from 'axios';
import queryString from 'query-string';
import { BookCriticalInfo } from '@/pages/types';

import { DEFAULT_LIMIT } from '@/utils/constants';

const { OL_BASE_URL = 'https://openlibrary.org/' } = process.env;

const getTrendings = async (limit = DEFAULT_LIMIT) => {
  const trendingsUrl = `${OL_BASE_URL}/trendings/daily.json`
  const queryParam = queryString.stringify({ limit }); 

  try {
    const response = await axios.get(`${trendingsUrl}?${queryParam}`);
    return response.data?.works;
  } catch (error) {
    console.error(error);
    return { works: {} };
  }
}

const getSearch = async (q: string) => {
  const queryParams = queryString.stringify({ limit: DEFAULT_LIMIT, q, offset: 0 })
  
  try {
    const response = await axios.get(`${OL_BASE_URL}/search.json?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

export const extractCriticalInfo = (arrayOfBooks: BookCriticalInfo[]) => {
  return arrayOfBooks.map(({ key, title, first_publish_year, author_name, author_key, cover_i }: BookCriticalInfo) => {
    const publish = first_publish_year ?? ''
    const author = author_name ? author_name[0] : '';
    const authorId = author_key ? author_key[0] : '';
    const cover = cover_i ?? null;

    return ({ key, title, publish, author, authorId, cover })
  })
}

const formatQueryParam = (text: string) => text.replaceAll(' ', '+');

export const getInitialValues = async (q: string | undefined) => {
  try {
    if (q) {
      const queryParam = formatQueryParam(q);
      const { numFound, start, docs, offset } = await getSearch(queryParam);
      
      const books = extractCriticalInfo(docs);
      const list = { totalBooks: numFound, start, books, offset, type: 'query' };
      return list;
    }

    const trendings = await getTrendings();
    const books = extractCriticalInfo(trendings)

    return { books, type: 'trendings' }
  } catch (err) {
    console.error(err);
    return {}
  }
}

export const searchBookService = async (title: string, limit?: number, offset?: number) => {
  const titleEncoded = formatQueryParam(title);
  const queryParam = queryString.stringify({ q: titleEncoded, limit, offset })

  return await axios.get(`/api/search?${queryParam}`);
}

export const getBook = async (id: string, limit = DEFAULT_LIMIT) => {
  const queryParam = queryString.stringify({ id, limit })

  return await axios.get(`/api/book?${queryParam}`);
}

export const getAuthor = async (id: string) => {
  const queryParam = queryString.stringify({ id })

  return await axios.get(`/api/author?${queryParam}`);
}
