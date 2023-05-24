export default async function handler(req, res) {
  const area = req.body.area

  const resp = await fetch("http://localhost:8080")

  const data = await resp.json();
  console.log(data)
  return res.json({ plans: data})
}
