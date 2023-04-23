import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import queryString from 'query-string';

import { DEFAULT_LIMIT } from '@/utils/constants';
import { formatQueryParam } from '@/services';
import { extractCriticalInfo } from '@/utils';

const { OL_BASE_URL } = process.env;

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

export default async function GET (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { q } = req.query;

  try {
    if (q) {
      const queryParam = formatQueryParam(q.toString());
      const { numFound, start, docs, offset } = await getSearch(queryParam);
      
      const books = extractCriticalInfo(docs);
      const list = { totalBooks: numFound, start, books, offset, type: 'query' };
      res.status(200).json(list);
    }

    const trendings = await getTrendings();
    const books = extractCriticalInfo(trendings)

    res.status(200).json({ books, type: 'trendings' })
  } catch (err) {
    res.status(500);
  }
}
