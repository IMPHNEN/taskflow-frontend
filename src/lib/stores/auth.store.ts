import { writable } from 'svelte/store';
import type { AuthSession } from '../types';
import { AuthService } from '../service';

// Create a writable store for auth state
const createAuthStore = () => {
  const { subscribe, set, update } = writable<{
    isAuthenticated: boolean;
    user: AuthSession['user'] | null;
    loading: boolean;
    error: string | null;
  }>({
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null
  });

  return {
    subscribe,
    setUser: (session: AuthSession) => {
      AuthService.storeTokens(session.access_token, session.refresh_token);
      update(state => ({
        ...state,
        isAuthenticated: true,
        user: session.user,
        loading: false,
        error: null
      }));
    },
    clearUser: () => {
      AuthService.signOut();
      update(state => ({
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      }));
    },
    setLoading: (loading: boolean) => {
      update(state => ({ ...state, loading }));
    },
    setError: (error: string) => {
      update(state => ({ ...state, error }));
    },
    setAuthenticated: (user: AuthSession['user']) => {
      update(state => ({
        ...state,
        isAuthenticated: true,
        user,
        loading: false,
        error: null
      }));
    },
    signOut: () => {
      AuthService.signOut();
      update(state => ({
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      }));
    },
    checkAuth: async () => {
      const isAuthenticated = AuthService.isAuthenticated();
      if (isAuthenticated) {
        try {
          // You might want to add an endpoint to get current user data
          // const user = await AuthService.getCurrentUser();
          update(state => ({
            ...state,
            isAuthenticated: true,
            loading: false,
            error: null
          }));
        } catch (error) {
          AuthService.signOut();
          update(state => ({
            ...state,
            isAuthenticated: false,
            user: null,
            loading: false,
            error: 'Authentication failed'
          }));
        }
      } else {
        update(state => ({
          ...state,
          isAuthenticated: false,
          user: null,
          loading: false,
          error: null
        }));
      }
    }
  };
};

export const authStore = createAuthStore(); 