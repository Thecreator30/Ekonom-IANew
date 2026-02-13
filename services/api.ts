
const API_BASE_URL = 'http://localhost:3000';

// Mock data handler to simulate backend responses when API is unreachable
const getMockData = (endpoint: string, method: string, body?: any) => {
  console.log(`[Mock API] ${method} ${endpoint}`, body);

  // QR Token Endpoint for Welcome Offer
  if (endpoint.includes('/api/welcome-offer/qr')) {
    return { success: true, token: 'mock-signed-qr-token-' + Date.now().toString(36) };
  }
  
  // Welcome Offer Config Endpoint
  if (endpoint === '/api/welcome-offer') {
    if (method === 'GET') {
      return { 
        success: true, 
        data: { 
          discount_value: 15, 
          discount_type: 'percent',
          is_active: true,
          scans_count: 342,
          coupons_generated: 215,
          coupons_redeemed: 189
        } 
      };
    }
    if (method === 'PUT') {
       return { success: true, data: body };
    }
  }

  // --- Promotions Mocks ---
  
  // Specific Promotion QR
  if (endpoint.match(/\/api\/promotions\/[\w-]+\/qr/)) {
    return { success: true, token: 'mock-promo-hmac-' + Math.random().toString(36).substring(7) };
  }

  // Single Promotion Details
  if (endpoint.match(/\/api\/promotions\/[\w-]+$/) && method === 'GET') {
     return {
        success: true,
        data: {
            id: 'mock-id-123',
            title: 'Flash Rentrée',
            description: 'Profitez de la rentrée pour booster votre équipement.',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 86400000 * 7).toISOString(),
            status: 'active',
            ai_generated: true,
            stats: { clicks: 124, conversions: 12, revenue: 450 }
        }
     };
  }

  // Generic success for other potential endpoints
  return { success: true, message: 'Mock response from client' };
};

export const api = {
  get: async (endpoint: string) => {
    const token = localStorage.getItem('token');
    try {
      // Attempt actual fetch
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if(!response.ok) throw new Error("API Request Failed");
      return await response.json();
    } catch (err) {
      console.warn(`API connection failed for ${endpoint}, falling back to mock data.`);
      // Return mock data so the UI doesn't break
      return getMockData(endpoint, 'GET');
    }
  },

  put: async (endpoint: string, body: any) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if(!response.ok) throw new Error("API Request Failed");
      return await response.json();
    } catch (err) {
      console.warn(`API connection failed for ${endpoint}, falling back to mock data.`);
      return getMockData(endpoint, 'PUT', body);
    }
  },

  post: async (endpoint: string, body: any) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if(!response.ok) throw new Error("API Request Failed");
      return await response.json();
    } catch (err) {
      console.warn(`API connection failed for ${endpoint}, falling back to mock data.`);
      return getMockData(endpoint, 'POST', body);
    }
  }
};
