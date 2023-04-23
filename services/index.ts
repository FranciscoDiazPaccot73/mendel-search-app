import axios from 'axios';
import queryString from 'query-string';

import { DEFAULT_LIMIT } from '@/utils/constants';

export const formatQueryParam = (text: string) => text.replaceAll(' ', '+');

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
