import { AuthService, UserService } from '../service';
import { authStore } from '../stores';
import type { Writable } from 'svelte/store';
import { goto } from '$app/navigation';

/**
 * Initialize auth state - check if user is logged in and get user info
 */
export async function initAuth() {
  authStore.setLoading(true);
  
  try {
    if (AuthService.isAuthenticated()) {
      const user = await UserService.getCurrentUser();
      authStore.setAuthenticated(user);
    } else {
      authStore.signOut();
    }
  } catch (error) {
    console.error('Error initializing auth:', error);
    authStore.signOut();
  }
}

/**
 * Login with email and password
 */
export async function login(email: string, password: string) {
  authStore.setLoading(true);
  
  try {
    const session = await AuthService.login({ email, password });
    
    // Store tokens
    AuthService.storeTokens(session.access_token, session.refresh_token);
    
    // Get user info and update auth store
    if (session.user) {
      authStore.setAuthenticated(session.user);
    } else {
      const user = await UserService.getCurrentUser();
      authStore.setAuthenticated(user);
    }
    
    // Redirect to dashboard
    goto('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error logging in:', error);
    authStore.setError('Invalid email or password');
    return { success: false, error: 'Invalid email or password' };
  }
}

/**
 * Register a new user
 */
export async function register(email: string, password: string, fullName: string) {
  authStore.setLoading(true);
  
  try {
    const session = await AuthService.register({ 
      email, 
      password, 
      full_name: fullName 
    });
    
    // Store tokens
    AuthService.storeTokens(session.access_token, session.refresh_token);
    
    // Get user info and update auth store
    if (session.user) {
      authStore.setAuthenticated(session.user);
    } else {
      const user = await UserService.getCurrentUser();
      authStore.setAuthenticated(user);
    }
    
    // Redirect to dashboard
    goto('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error registering:', error);
    authStore.setError('Failed to create account');
    return { success: false, error: 'Failed to create account' };
  }
}

/**
 * Handle GitHub login - get login URL
 */
export async function getGitHubLoginUrl() {
  try {
    const loginData = await AuthService.getGitHubLoginUrl();
    
    // Store code verifier in session storage temporarily
    sessionStorage.setItem('code_verifier', loginData.code_verifier);
    
    return loginData.url;
  } catch (error) {
    console.error('Error getting GitHub login URL:', error);
    authStore.setError('Failed to get GitHub login URL');
    throw error;
  }
}

/**
 * Handle GitHub login callback
 */
export async function handleGitHubCallback(code: string) {
  authStore.setLoading(true);
  
  try {
    // Get code verifier from session storage
    const codeVerifier = sessionStorage.getItem('code_verifier');
    
    // Exchange code for session
    const session = await AuthService.exchangeGitHubCode(code, codeVerifier || undefined);
    
    // Store tokens
    AuthService.storeTokens(session.access_token, session.refresh_token);
    
    // Clear code verifier from session storage
    sessionStorage.removeItem('code_verifier');
    
    // Get user info and update auth store
    if (session.user) {
      authStore.setAuthenticated(session.user);
    } else {
      const user = await UserService.getCurrentUser();
      authStore.setAuthenticated(user);
    }
    
    // Redirect to dashboard
    goto('/dashboard');
  } catch (error) {
    console.error('Error exchanging GitHub code:', error);
    authStore.setError('Failed to authenticate with GitHub');
    goto('/login');
  }
}

/**
 * Sign out user
 */
export async function signOut() {
  try {
    await AuthService.signOut();
    authStore.signOut();
    goto('/login');
  } catch (error) {
    console.error('Error signing out:', error);
    // Force sign out anyway
    authStore.signOut();
    goto('/login');
  }
} 