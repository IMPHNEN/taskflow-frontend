import apiClient from './api';
import type { User } from '../types';

/**
 * UserService handles user information related API calls
 */
export const UserService = {
  /**
   * Get current user's information
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/user/me');
    return response.data;
  }
}; 