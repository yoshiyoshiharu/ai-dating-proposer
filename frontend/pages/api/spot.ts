import { NextApiRequest, NextApiResponse } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(BASE_URL)
  if (req.method !== 'GET') {
    res.status(500).json({ error: 'Only GET requests allowed' })
    return
  }

  const resp = await fetch(BASE_URL + '/api/spots?area=' + req.query.area)

  if (resp.status !== 200) {
    res.status(500).json({ error: 'Error fetching spots' })
    return
  } else {
    const data = await resp.json()

    res.status(200).json(data)
  }
}
