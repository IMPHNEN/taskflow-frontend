<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
    import ProjectCreate from '$lib/components/Project/Create.svelte';
    import { onMount } from 'svelte';
    import { projectStore } from '$lib/stores';
    import { fetchProjects } from '$lib/actions';
    import type { Project } from '$lib/types';

    let showCreate = false;
    let projects: Project[] = [];
    let loading = true;
    let error = '';

    // Subscribe to the project store
    const unsubscribe = projectStore.subscribe(state => {
        projects = state.projects;
        loading = state.isLoading;
        error = state.error || '';
    });

    onMount(() => {
        fetchProjects().catch(err => {
            console.error('Failed to fetch projects:', err);
        });

        return unsubscribe; // Clean up subscription when component unmounts
    });

    const handleCreateSuccess = () => {
        showCreate = false;
        fetchProjects(); // Refresh projects after creating a new one
    };
</script>

<svelte:head>
    <title>Projects</title>
</svelte:head>

<div class="flex items-center justify-between">
    <div>
        <h1 class="text-3xl font-semibold mb-2 text-gray-800">Projects</h1>
        <p class="text-gray-500 text-lg mb-8">Manage your projects and tasks</p>
    </div>
    <button on:click={() => showCreate = true} class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
        <i class="bx bx-plus"></i> New Project
    </button>
</div>

{#if loading}
    <div class="flex justify-center items-center py-24">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>
{:else if error}
    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6">
        <strong class="font-bold">Error:</strong>
        <span class="block sm:inline">{error}</span>
    </div>
{:else if projects.length === 0}
    <div class="flex flex-col items-center justify-center py-16 text-center">
        <div class="bg-gray-100 p-6 rounded-full mb-4">
            <i class="bx bx-folder-open text-gray-400 text-5xl"></i>
        </div>
        <h2 class="text-2xl font-medium text-gray-700 mb-2">No projects yet</h2>
        <p class="text-gray-500 mb-6 max-w-md">Create your first project to get started and organize your work</p>
        <button on:click={() => showCreate = true} class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
            <i class="bx bx-plus"></i> Create Project
        </button>
    </div>
{:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {#each projects as project}
            <ProjectCard {project} />
        {/each}
    </div>
{/if}

{#if showCreate}
    <ProjectCreate close={() => showCreate = false} />
{/if}