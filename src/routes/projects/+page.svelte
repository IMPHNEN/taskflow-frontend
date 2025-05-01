<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
</script>

<h1 class="text-3xl font-semibold mb-2 text-gray-800">Projects</h1>
<p class="text-gray-500 text-lg mb-8">Manage your projects and tasks</p>

<div class="grid grid-cols-3 gap-6 mt-6">
    {#each Array(9).fill(0) as _}
        <ProjectCard />
    {/each}
</div>