import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://templates.dokploy.com/meta.json");
    if (!response.ok) throw new Error("External registry unreachable");
    const data = await response.json();
    
    // Cache the response for 1 hour to stay fast
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch templates" });
  }
}