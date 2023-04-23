import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import queryString from 'query-string';

import { DEFAULT_LIMIT } from '@/utils/constants';
import { extractCriticalInfo } from '@/utils';

const { OL_BASE_URL } = process.env;

export default async function GET (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit = DEFAULT_LIMIT, q, offset = 0 } = req.query;
  const queryParams = queryString.stringify({ limit, q, offset })

  try {    
    const { data } = await axios.get(`${OL_BASE_URL}/search.json?${queryParams}`)

    const { numFound, start, docs, offset } = data;
      
    const books = extractCriticalInfo(docs);
    const list = { totalBooks: numFound, start, books, offset, type: 'query' };

    res.status(200).json(list)
  } catch (err) {
    res.status(500);
  }
}
