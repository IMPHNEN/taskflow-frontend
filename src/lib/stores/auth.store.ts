import { writable } from 'svelte/store';
import type { User } from '../types';

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null
};

function createAuthStore() {
  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    
    // Set user as authenticated
    setAuthenticated: (user: User) => update(state => ({
      ...state,
      isAuthenticated: true,
      isLoading: false,
      user,
      error: null
    })),
    
    // Set authentication loading state
    setLoading: (isLoading: boolean) => update(state => ({
      ...state,
      isLoading
    })),
    
    // Set authentication error
    setError: (error: string) => update(state => ({
      ...state,
      isLoading: false,
      error
    })),
    
    // Sign out - reset store to initial state
    signOut: () => set({
      ...initialState,
      isLoading: false
    })
  };
}

export const authStore = createAuthStore(); 