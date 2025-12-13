const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('adminToken');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Public request (no auth token)
  async publicRequest(endpoint: string, options: RequestInit = {}, timeout: number = 60000) {
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      // Create AbortController for timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...config,
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      
      // Try to parse JSON, but handle cases where response might not be JSON
      let data;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(text || `Server error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || `Request failed with status ${response.status}`);
      }

      return data;
    } catch (error: any) {
      // Handle abort (timeout)
      if (error.name === 'AbortError') {
        throw new Error('Request timeout: The server took too long to respond. Please try again.');
      }
      // Re-throw if it's already an Error with a message
      if (error instanceof Error) {
        throw error;
      }
      // Handle network errors
      throw new Error('Network error: Unable to connect to the server. Please check your connection.');
    }
  },

  // Pricing
  getPricing: () => api.request('/pricing'),
  createPricing: (data: any) => api.request('/pricing', { method: 'POST', body: JSON.stringify(data) }),
  updatePricing: (id: string, data: any) => api.request(`/pricing/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePricing: (id: string) => api.request(`/pricing/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => api.request('/content/services'),
  createService: (data: any) => api.request('/content/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => api.request(`/content/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: string) => api.request(`/content/services/${id}`, { method: 'DELETE' }),

  // Content
  getContent: () => api.request('/content'),
  getContentBySection: (section: string) => api.request(`/content/section/${section}`),
  updateContent: (data: any) => api.request('/content/section', { method: 'POST', body: JSON.stringify(data) }),

  // Admin
  login: (email: string, password: string) => 
    api.request('/admin/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    }),
  verifyToken: () => api.request('/admin/verify'),

  // Contact/Leads
  submitContact: (data: any) => 
    api.publicRequest('/contact/submit', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  getLeads: () => api.request('/contact/leads'),
  updateLeadStatus: (id: string, status: string) => 
    api.request(`/contact/leads/${id}/status`, { 
      method: 'PUT', 
      body: JSON.stringify({ status }) 
    }),
  deleteLead: (id: string) => api.request(`/contact/leads/${id}`, { method: 'DELETE' }),

  // Chatbot (with 90 second timeout to allow for AI processing)
  chatWithBot: (message: string, history: Array<{ role: string; content: string }> = []) =>
    api.publicRequest('/chatbot/chat', {
      method: 'POST',
      body: JSON.stringify({ message, history })
    }, 90000), // 90 second timeout - AI APIs can take 30-60 seconds to respond
};
