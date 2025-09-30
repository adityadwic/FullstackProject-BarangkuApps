// pages/api/[...path].js
export default async function handler(req, res) {
  const { method, body, query } = req;
  const { path, ...otherParams } = query;
  
  // Construct target URL
  const apiPath = Array.isArray(path) ? path.join('/') : '';
  
  // Build query string from other parameters
  const queryParams = new URLSearchParams(otherParams);
  const queryString = queryParams.toString();
  const targetUrl = `http://127.0.0.1:3001/api/${apiPath}${queryString ? `?${queryString}` : ''}`;
  
  console.log(`Proxying ${method} request to: ${targetUrl}`);
  
  try {
    const fetchOptions = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(req.headers.authorization && { 'Authorization': req.headers.authorization }),
      },
    };

    // Add body for non-GET requests
    if (method !== 'GET' && method !== 'HEAD' && body) {
      fetchOptions.body = JSON.stringify(body);
    }

    const response = await fetch(targetUrl, fetchOptions);
    
    let data;
    try {
      data = await response.json();
    } catch {
      data = { message: 'Response parsing error' };
    }
    
    res.status(response.status).json(data);
  } catch (error) {
    console.error('API Proxy error:', error);
    res.status(500).json({ 
      message: 'Internal proxy error', 
      error: error.message,
      targetUrl 
    });
  }
}