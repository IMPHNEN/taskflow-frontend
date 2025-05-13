<script lang="ts">
    import { page } from '$app/state';
	import '../app.css';
	
	let { children } = $props();
</script>

{#if !page.url.pathname.includes('login') && !page.url.pathname.includes('register')}
<div class="flex max-h-dvh overflow-hidden">
	<div class="w-64 h-dvh border border-r border-gray-200 bg-white px-4 py-6">
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
			<button class="text-3xl flex justify-center items-center">
				<i class="bx bxl-github"></i>
			</button>
			<div class="w-10 h-10 rounded-full overflow-hidden">
				<img src="https://awsimages.detik.net.id/community/media/visual/2019/02/19/42393387-9c5c-4be4-97b8-49260708719e.jpeg?w=700&q=90" alt="">
			</div>
		</div>

		<!-- body -->
		<div class="h-full bg-gray-50 w-full p-4">
			{@render children()}
		</div>
	</div>
</div>
{:else}
{@render children()}
{/if}
