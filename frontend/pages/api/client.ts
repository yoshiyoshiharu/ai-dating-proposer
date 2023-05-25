import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.stringify({
    area: req.body.area,
})

  const resp = await fetch("http://localhost:8080", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: body
  })

  const data = await resp.json();
  console.log(data)
  return res.json({ plans: data})
}
