const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// API request helper
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle network errors
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.error || `Request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle network failures
    if (error.message.includes('fetch')) {
      throw new Error('Unable to connect to server. Please make sure the backend is running.');
    }
    console.error('API Error:', error);
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (username, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    
    // Store token and user info
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  isAdmin: () => {
    const user = authAPI.getCurrentUser();
    return user?.role === 'admin';
  },
};

// Sweets API
export const sweetsAPI = {
  getAll: async () => {
    return apiRequest('/sweets');
  },

  getById: async (id) => {
    return apiRequest(`/sweets/${id}`);
  },

  search: async (query) => {
    const params = new URLSearchParams();
    if (query.name) params.append('name', query.name);
    if (query.category) params.append('category', query.category);
    if (query.minPrice) params.append('minPrice', query.minPrice);
    if (query.maxPrice) params.append('maxPrice', query.maxPrice);
    
    return apiRequest(`/sweets/search?${params.toString()}`);
  },

  create: async (sweetData) => {
    return apiRequest('/sweets', {
      method: 'POST',
      body: JSON.stringify(sweetData),
    });
  },

  update: async (id, sweetData) => {
    return apiRequest(`/sweets/${id}`, {
      method: 'PUT',
      body: JSON.stringify(sweetData),
    });
  },

  delete: async (id) => {
    return apiRequest(`/sweets/${id}`, {
      method: 'DELETE',
    });
  },

  purchase: async (id, quantity) => {
    return apiRequest(`/sweets/${id}/purchase`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  },

  restock: async (id, quantity) => {
    return apiRequest(`/sweets/${id}/restock`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  },
};

