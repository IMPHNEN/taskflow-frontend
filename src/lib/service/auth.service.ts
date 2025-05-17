import apiClient from './api';
import type { AuthSession } from '../types';

interface GitHubLoginResponse {
  url: string;
  code_verifier: string;
}

/**
 * AuthService handles all authentication related API calls
 */
export const AuthService = {
  /**
   * Get GitHub OAuth login URL
   */
  getGitHubLoginUrl: async (): Promise<GitHubLoginResponse> => {
    const response = await apiClient.get<GitHubLoginResponse>('/user/auth/github/login');
    return response.data;
  },

  /**
   * Exchange GitHub OAuth code for session
   */
  exchangeGitHubCode: async (code: string, codeVerifier?: string): Promise<AuthSession> => {
    const response = await apiClient.post<AuthSession>('/user/auth/github/exchange-code', {
      code,
      code_verifier: codeVerifier
    });
    return response.data;
  },

  /**
   * Refresh access token using refresh token
   */
  refreshToken: async (refreshToken: string): Promise<AuthSession> => {
    const response = await apiClient.post<AuthSession>('/user/auth/refresh', {
      refresh_token: refreshToken
    });
    return response.data;
  },

  /**
   * Sign out user and invalidate session
   */
  signOut: async (): Promise<void> => {
    await apiClient.post('/user/auth/signout', {});
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('access_token');
  },
  
  /**
   * Get stored access token
   */
  getAccessToken: (): string | null => {
    return localStorage.getItem('access_token');
  },
  
  /**
   * Get stored refresh token
   */
  getRefreshToken: (): string | null => {
    return localStorage.getItem('refresh_token');
  },
  
  /**
   * Store authentication tokens
   */
  storeTokens: (accessToken: string, refreshToken: string): void => {
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }
}; 