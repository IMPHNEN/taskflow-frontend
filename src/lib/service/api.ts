// API client using native fetch instead of axios

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Request configuration type
type RequestConfig = {
  method: string;
  headers: Record<string, string>;
  body?: string;
  params?: Record<string, string>;
};

// Core fetch function with interceptors
async function fetchWithInterceptors<T>(
  endpoint: string,
  config: RequestConfig
): Promise<T> {
  // Apply request interceptor - add auth token
  const requestConfig = applyRequestInterceptor(config);
  
  // Build URL with query params if needed
  let url = `${BASE_URL}${endpoint}`;
  if (config.params) {
    const queryParams = new URLSearchParams();
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(key, value);
      }
    });
    const queryString = queryParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }
  
  try {
    // Make the request
    const response = await fetch(url, {
      method: config.method,
      headers: requestConfig.headers,
      body: config.body,
    });
    
    // Handle 401 Unauthorized (potentially refresh token)
    if (response.status === 401) {
      const refreshed = await handleTokenRefresh();
      
      if (refreshed) {
        // Retry with new token
        const newConfig = applyRequestInterceptor(config);
        const retryResponse = await fetch(url, {
          method: config.method,
          headers: newConfig.headers,
          body: config.body,
        });
        
        if (!retryResponse.ok) {
          throw new Error(`HTTP error! Status: ${retryResponse.status}`);
        }
        
        return await retryResponse.json();
      }
    }
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    // Handle empty response
    const text = await response.text();
    return text ? JSON.parse(text) : {} as T;
    
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// Apply request interceptor (add auth token)
function applyRequestInterceptor(config: RequestConfig): RequestConfig {
  const newConfig = { ...config };
  const token = localStorage.getItem('access_token');
  
  if (token) {
    newConfig.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return newConfig;
}

// Handle token refresh
async function handleTokenRefresh(): Promise<boolean> {
  const refreshToken = localStorage.getItem('refresh_token');
  
  if (!refreshToken) {
    // No refresh token, logout user
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    return false;
  }
  
  try {
    // Try to refresh token
    const response = await fetch(`${BASE_URL}/user/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }
    
    const data = await response.json();
    
    // Save new tokens
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    
    return true;
    
  } catch (error) {
    // If refresh token fails, logout user
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/login';
    return false;
  }
}

// API client with same interface as before
const apiClient = {
  async get<T>(endpoint: string, options: { params?: Record<string, string> } = {}): Promise<{ data: T }> {
    const config: RequestConfig = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      params: options.params,
    };
    
    const responseData = await fetchWithInterceptors<T>(endpoint, config);
    return { data: responseData };
  },
  
  async post<T>(endpoint: string, data: any): Promise<{ data: T }> {
    const config: RequestConfig = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    
    const responseData = await fetchWithInterceptors<T>(endpoint, config);
    return { data: responseData };
  },
  
  async patch<T>(endpoint: string, data: any): Promise<{ data: T }> {
    const config: RequestConfig = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    
    const responseData = await fetchWithInterceptors<T>(endpoint, config);
    return { data: responseData };
  },
  
  async delete<T>(endpoint: string): Promise<{ data: T }> {
    const config: RequestConfig = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const responseData = await fetchWithInterceptors<T>(endpoint, config);
    return { data: responseData };
  },
};

export default apiClient; 