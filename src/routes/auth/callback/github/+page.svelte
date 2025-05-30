<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { handleGitHubCallback } from '$lib/actions/auth.actions';
  import { authStore } from '$lib/stores';

  let error = '';

  onMount(async () => {
    try {
      // Get code from URL
      const code = $page.url.searchParams.get('code');
      
      if (!code) {
        error = 'No authorization code provided';
        return;
      }
      
      // Handle GitHub callback
      await handleGitHubCallback(code);
    } catch (err) {
      console.error('Error during GitHub callback:', err);
      error = 'Failed to authenticate with GitHub';
    }
  });
</script>

<div class="h-dvh flex items-center justify-center bg-gray-50">
  <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
    {#if $authStore.loading}
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">Authenticating...</h1>
      <p class="text-gray-600">Please wait while we authenticate you with GitHub.</p>
      <div class="mt-8 flex justify-center">
        <div class="loading-spinner"></div>
      </div>
    {:else if error || $authStore.error}
      <h1 class="text-2xl font-semibold text-gray-900 mb-4">Authentication Error</h1>
      <p class="text-red-500 mb-4">{error || $authStore.error}</p>
      <a href="/login" class="inline-block py-2 px-4 bg-[#2fcc71] text-white font-medium rounded-lg">
        Back to Login
      </a>
    {/if}
  </div>
</div>

<style>
  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #2fcc71;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style> 