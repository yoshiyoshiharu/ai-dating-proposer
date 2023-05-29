import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const area = req.body.area

  const resp = await fetch("http://localhost:8080/api")

  const data = await resp.json();
  return res.json({ plans: data })
}
