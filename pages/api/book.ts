import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';
import queryString from 'query-string';

import { DEFAULT_LIMIT } from '@/utils/constants';

const { OL_BASE_URL } = process.env;

export default async function GET (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { limit = DEFAULT_LIMIT, id } = req.query;
  const bookUrl = `${OL_BASE_URL}${id}.json`
  const queryParam = queryString.stringify({ limit }); 

  try {    
    const { data } = await axios.get(`${bookUrl}?${queryParam}`);

    res.status(200).json(data)
  } catch (err) {
    res.status(500);
  }
}
