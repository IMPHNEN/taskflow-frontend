<script lang="ts">
    import { page } from '$app/state';
	import '../app.css';
	
	let { children } = $props();
</script>

<div class="flex">
	<div class="w-64 h-screen bg-white border-r border-gray-200 px-4 py-6">
		<div class="flex items-center gap-2 mb-8">
			<h1 class="font-semibold text-xl">TaskFlow</h1>
		</div>
		<nav class="flex flex-col gap-1">
			<a href='/' class="nav-link {page.url.pathname === '/' ? 'active' : ''}">
				<i class='bx bx-grid-alt'></i>
				<span class="font-medium">Dashboard</span>
			</a>
			<a href='/projects' class="nav-link {page.url.pathname.startsWith('/projects') ? 'active' : ''}">
				<i class='bx bx-list-ul'></i>
				<span>Projects</span>
			</a>
			<button class="nav-link">
				<i class="bx bx-log-out"></i>
				<span>Logout</span>
			</button>
		</nav>
	</div>
	
	<div class="bg-gray-100 w-full min-h-dvh overflow-y-auto p-4">
		<div class="p-4 bg-white rounded-md">
			{@render children()}
		</div>
	</div>
</div>
