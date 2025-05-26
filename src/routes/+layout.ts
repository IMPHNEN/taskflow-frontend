import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { AuthService } from '$lib/service';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ url }) => {
  // Skip auth check for login, register, and auth-callback pages and landing page
  if (url.pathname.includes('login') || url.pathname.includes('register') || url.pathname.includes('/') || url.pathname.includes('auth/callback')) {
    return {};
  }

  // Only run auth check in the browser
  if (browser) {
    // Check if user is authenticated
    const isAuthenticated = AuthService.isAuthenticated();
    
    if (!isAuthenticated) {
      // Redirect to login page
      goto('/login');
      return {};
    }
  }

  return {};
}; 