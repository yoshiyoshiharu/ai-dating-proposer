export default async function handler(req, res) {
  const externalApiUrl = 'http://localhost:8080/place_photo'

  const response = await fetch(externalApiUrl);

  // レスポンスヘッダを設定する（必要に応じて適切なヘッダを設定してください）
  return response
}
