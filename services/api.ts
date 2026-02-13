
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const getMockData = (endpoint: string, method: string, body?: any) => {
  console.log(`[Mock API] ${method} ${endpoint}`, body);

  // Auth
  if (endpoint === '/api/auth/login' && method === 'POST') {
    return {
      success: true,
      data: {
        accessToken: 'mock-jwt-' + Date.now().toString(36),
        refreshToken: 'mock-refresh-' + Date.now().toString(36),
        merchant: { id: 'mock-1', email: body?.email || 'demo@ekonom.ia', company_name: 'Boutique St-Honore' }
      }
    };
  }

  // Dashboard Stats
  if (endpoint === '/api/dashboard/stats') {
    return {
      success: true,
      data: {
        revenue: 12450,
        revenueGrowth: 14,
        subscribers: 1248,
        newSubscribers: 12,
        activeCoupons: 85,
        couponExpiringSoon: 2,
      }
    };
  }

  // Subscribers
  if (endpoint === '/api/subscribers' && method === 'GET') {
    return {
      success: true,
      data: [
        { id: '1', name: 'Jean Dupont', email: 'jean.d@example.com', joined_at: '2024-10-12', push_enabled: true },
        { id: '2', name: 'Sophie Martin', email: 's.martin@studio.fr', joined_at: '2024-10-11', push_enabled: false },
        { id: '3', name: 'Lucas Bernard', email: 'lucas.b@tech.io', joined_at: '2024-10-10', push_enabled: true },
        { id: '4', name: 'Emma Laurent', email: 'emma.l@design.co', joined_at: '2024-10-09', push_enabled: true },
        { id: '5', name: 'Clara Thomas', email: 'clara.t@art.net', joined_at: '2024-10-08', push_enabled: false },
        { id: '6', name: 'Marc Petit', email: 'marc.petit@web.fr', joined_at: '2024-10-07', push_enabled: true },
      ]
    };
  }

  // Promotions list
  if (endpoint === '/api/promotions' && method === 'GET') {
    return {
      success: true,
      data: [
        {
          id: 'sales-v1',
          title: "Soldes d'Ete V1",
          description: "Campagne principale pour le trafic magasin et web.",
          status: 'PUBLISHED',
          discount_value: 30,
          created_at: new Date().toISOString(),
          stats: { clicks: 1240, conversions: 148 }
        },
        {
          id: 'flash-rentree',
          title: "Flash Rentree",
          status: 'ARCHIVED',
          discount_value: 20,
          created_at: '2023-09-01T00:00:00Z',
          stats: { clicks: 450, conversions: 54 }
        },
      ]
    };
  }

  // Coupons POST (create)
  if (endpoint === '/api/coupons' && method === 'POST') {
    return { success: true, data: { id: Date.now().toString(), ...body, status: 'ACTIVE', used_count: 0 } };
  }

  // Subscribers POST (add)
  if (endpoint === '/api/subscribers' && method === 'POST') {
    return { success: true, data: { id: Date.now().toString(), ...body, joined_at: new Date().toISOString(), push_enabled: true } };
  }

  // Auth Register
  if (endpoint === '/api/auth/register' && method === 'POST') {
    return {
      success: true,
      data: {
        accessToken: 'mock-jwt-' + Date.now().toString(36),
        refreshToken: 'mock-refresh-' + Date.now().toString(36),
        merchant: { id: 'mock-new', email: body?.email || 'new@ekonom.ia', company_name: body?.company_name || 'Nouvelle Boutique' }
      }
    };
  }

  // Auth Logout
  if (endpoint === '/api/auth/logout' && method === 'POST') {
    return { success: true };
  }

  // Coupons
  if (endpoint === '/api/coupons' && method === 'GET') {
    return {
      success: true,
      data: [
        { id: '1', code: 'WELCOME20', description: 'Offre de bienvenue', discount_value: 20, status: 'ACTIVE', used_count: 142, max_uses: 500 },
        { id: '2', code: 'SUMMER50', description: "Soldes d'ete", discount_value: 50, status: 'EXPIRED', used_count: 500, max_uses: 500 },
      ]
    };
  }

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
            title: 'Flash Rentree',
            description: 'Profitez de la rentree pour booster votre equipement.',
            start_date: new Date().toISOString(),
            end_date: new Date(Date.now() + 86400000 * 7).toISOString(),
            status: 'active',
            ai_generated: true,
            stats: { clicks: 124, conversions: 12, revenue: 450 }
        }
     };
  }

  // AI Generate
  if (endpoint === '/api/ai/generate' && method === 'POST') {
    return {
      success: true,
      data: {
        title: 'Offre Flash du Jour',
        description: 'Ne manquez pas cette offre exceptionnelle ! -25% sur toute la boutique pendant 24h.',
      }
    };
  }

  // Settings Security (login history)
  if (endpoint === '/api/settings/security' && method === 'GET') {
    return {
      success: true,
      data: {
        loginHistory: [
          { id: 1, device: 'iPhone 15 Pro', ip: '192.168.1.42', location: 'Paris, FR', date: "Aujourd'hui, 09:41", current: true },
          { id: 2, device: 'MacBook Air', ip: '82.14.55.12', location: 'Lyon, FR', date: 'Hier, 18:30', current: false },
        ]
      }
    };
  }

  // Settings Profile
  if (endpoint === '/api/settings/profile') {
    if (method === 'GET') {
      return {
        success: true,
        data: { company_name: 'Boutique St-Honore', email: 'alex@boutique.fr', plan: 'pro' }
      };
    }
    if (method === 'PATCH') {
      return { success: true, data: body };
    }
  }

  return { success: true, message: 'Mock response from client' };
};

const request = async (endpoint: string, method: string, body?: any) => {
  const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    // Handle auth errors
    if (response.status === 401) {
      console.warn('Token expired or invalid, clearing auth state.');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      window.location.hash = '/login';
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API ${method} ${endpoint} failed: ${response.status}`);
    }
    return await response.json();
  } catch (err: any) {
    if (err.message === 'Unauthorized') throw err;
    console.warn(`API connection failed for ${method} ${endpoint}, using mock data.`);
    return getMockData(endpoint, method, body);
  }
};

export const api = {
  get: (endpoint: string) => request(endpoint, 'GET'),
  post: (endpoint: string, body: any) => request(endpoint, 'POST', body),
  put: (endpoint: string, body: any) => request(endpoint, 'PUT', body),
  patch: (endpoint: string, body: any) => request(endpoint, 'PATCH', body),
  delete: (endpoint: string) => request(endpoint, 'DELETE'),
};
