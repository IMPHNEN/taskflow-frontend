import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { authStore } from '$lib/stores/auth.store';
import type { LayoutLoad } from './$types';

// List of public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/auth/callback'];

export const load: LayoutLoad = async ({ url }) => {
  // Skip auth check for public routes
  if (publicRoutes.some(route => url.pathname.startsWith(route))) {
    return {};
  }

  // Only run auth check in the browser
  if (browser) {
    // Check authentication status
    await authStore.checkAuth();
    
    // Subscribe to auth store changes
    const unsubscribe = authStore.subscribe(state => {
      if (!state.loading && !state.isAuthenticated) {
        // Redirect to login page if not authenticated
        goto('/login');
      }
    });

    // Cleanup subscription
    return {
      cleanup: () => unsubscribe()
    };
  }

  return {};
}; 