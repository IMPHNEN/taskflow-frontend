<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
    import ProjectCreate from '$lib/components/Project/Create.svelte';

    let showCreate = false;
</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<div class="flex items-center justify-between">
    <div>
        <h1 class="text-3xl font-semibold mb-2 text-gray-800">Projects</h1>
        <p class="text-gray-500 text-lg mb-8">Manage your projects and tasks</p>
    </div>
    <button on:click={() => showCreate = true} class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-darker transition-all">
        <i class="bx bx-plus"></i> New Project
    </button>
</div>

<div class="grid grid-cols-3 gap-6 mt-6">
    {#each Array(9).fill(0) as _}
        <ProjectCard />
    {/each}
</div>

{#if showCreate}
    <div on:click={() => showCreate = false} class="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center">
        <ProjectCreate close={() => showCreate = false} />
    </div>
{/if}