export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ error: "Teks wajib diisi" });
  }

  try {
    // Langsung redirect ke API eksternal
    const videoUrl = `https://api.sxtream.xyz/ai/texttovideo?text=${encodeURIComponent(text)}`;
    return res.redirect(videoUrl);

  } catch (error) {
    console.error('Error generating video:', error);
    return res.status(500).json({ error: "Gagal generate video" });
  }
}
