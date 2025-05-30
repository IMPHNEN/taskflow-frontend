<script lang="ts">
    import { page } from '$app/stores';
	import '../app.css';
	import { authStore } from '$lib/stores/auth.store';
	
	// List of public routes that don't require authentication
	const publicRoutes = ['/', '/login', '/register', '/auth/callback'];
	
	// Check if current route is public
	const isPublicRoute = $derived(publicRoutes.some(route => $page.url.pathname.startsWith(route)));

	function handleLogout() {
		authStore.clearUser();
	}
</script>

{#if $authStore.loading && !isPublicRoute}
	<div class="flex items-center justify-center min-h-screen">
		<div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
	</div>
{:else if !isPublicRoute}
	<div class="flex max-h-dvh overflow-hidden">
		<div class="w-64 h-dvh border border-r border-gray-200 bg-white px-4 py-6">
			<div class="flex items-center gap-2 mb-8">
				<h1 class="font-semibold text-xl">TaskFlow</h1>
			</div>
			<nav class="flex flex-col gap-1">
				<a href='/dashboard' class="nav-link {$page.url.pathname === '/dashboard' ? 'active' : ''}">
					<i class='bx bx-grid-alt'></i>
					<span class="font-medium">Dashboard</span>
				</a>
				<a href='/projects' class="nav-link {$page.url.pathname.startsWith('/projects') ? 'active' : ''}">
					<i class='bx bx-list-ul'></i>
					<span>Projects</span>
				</a>
				<button class="nav-link" on:click={handleLogout}>
					<i class="bx bx-log-out"></i>
					<span>Logout</span>
				</button>
			</nav>
		</div>
		
		<div class="w-full h-dvh overflow-y-auto">
			<div class="sticky top-0 z-50 bg-white flex h-16 justify-end items-center gap-4 p-6">
				<form class="flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
					<i class='bx bx-search text-gray-400'></i>
					<input
						placeholder="Search"
						id="search"
						type="text"
						name="search"
						required
						class="w-full text-gray-900"
					/>
				</form>
				<button class="text-3xl flex justify-center items-center" aria-label="GitHub">
					<i class="bx bxl-github"></i>
				</button>
				<div class="w-10 h-10 rounded-full overflow-hidden">
					{#if $authStore.user?.avatar_url}
						<img src={$authStore.user.avatar_url} alt={$authStore.user.full_name || 'User'}>
					{:else}
						<div class="w-full h-full bg-gray-300 flex items-center justify-center text-white">
							{$authStore.user?.full_name ? $authStore.user.full_name.charAt(0).toUpperCase() : 'U'}
						</div>
					{/if}
				</div>
			</div>

			<!-- body -->
			<div class="h-full bg-gray-50 w-full p-4">
				<slot />
			</div>
		</div>
	</div>
{:else}
	<slot />
{/if}

<style>
	:global(body) {
		@apply bg-gray-50;
	}
</style>
