import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const { OL_BASE_URL } = process.env;

export default async function GET (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const bookUrl = `${OL_BASE_URL}authors/${id}.json`

  try {    
    const { data } = await axios.get(`${bookUrl}`);

    res.status(200).json(data)
  } catch (err) {
    res.status(500);
  }
}
