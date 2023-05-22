export default function handler(req, res) {
  const body = req.body;

  if (req.method !== 'POST') {
    return res.status(405).json({ data: 'Method Not Allowed' });
  }

  if (!body.area) {
    return res.status(400).json({ data: 'Invalid Body' });
  }

  res.status(200).json({ data: `${body.area}` });
}
