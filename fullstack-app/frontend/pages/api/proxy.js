// pages/api/proxy.js
export default async function handler(req, res) {
  const { method, body, query } = req;
  const { path } = query;
  
  // Construct target URL
  const targetUrl = `http://localhost:3002/api/${Array.isArray(path) ? path.join('/') : path || ''}`;
  
  try {
    const response = await fetch(targetUrl, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization }),
      },
      ...(method !== 'GET' && { body: JSON.stringify(body) }),
    });

    const data = await response.json();
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ message: 'Proxy error', error: error.message });
  }
}