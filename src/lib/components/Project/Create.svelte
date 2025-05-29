<script lang="ts">
    import { createProject } from '$lib/actions';
    import type { ProjectCreate } from '$lib/types';
    import { projectStore } from '$lib/stores';
    
    export let close: () => void;
    
    let projectName = '';
    let objective = '';
    let industry = '';
    let estimatedIncome = '';
    let estimatedOutcome = '';
    let startDate = '';
    let endDate = '';
    
    let isSubmitting = false;
    let error = '';
    
    // Subscribe to project store errors
    const unsubscribe = projectStore.subscribe(state => {
        if (state.error) {
            error = state.error;
            isSubmitting = false;
        }
    });
    
    // Cleanup subscription on destroy
    import { onDestroy } from 'svelte';
    onDestroy(unsubscribe);
    
    async function handleSubmit() {
        if (!projectName.trim()) {
            error = 'Project name is required';
            return;
        }
        
        isSubmitting = true;
        error = '';
        
        try {
            const projectData: ProjectCreate = {
                name: projectName.trim(),
                objective: objective.trim(),
                industry: industry.trim() || null,
                estimated_income: estimatedIncome ? Number(estimatedIncome) : null,
                estimated_outcome: estimatedOutcome ? Number(estimatedOutcome) : null,
                start_date: startDate || null,
                end_date: endDate || null
            };
            
            await createProject(projectData);
            close();
        } catch (err) {
            console.error('Failed to create project:', err);
            isSubmitting = false;
            // Error is set by the action through the store
        }
    }
    
    function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            close();
        }
    }
</script>

<div 
    role="dialog" 
    aria-labelledby="create-project-title"
    on:click={close} 
    on:keydown={handleKeyDown}
    tabindex="0" 
    class="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50"
>
    <div 
        role="presentation"
        on:click|stopPropagation 
        on:keydown|stopPropagation
        class="flex flex-col gap-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
    >
        <div class="flex items-center justify-between gap-3">
            <div class="flex items-center gap-2">
                <i class="bx bx-plus-circle text-xl text-primary"></i>
                <h2 id="create-project-title" class="font-medium">Create New Project</h2>
            </div>
            <button 
                on:click={close} 
                aria-label="Close dialog" 
                class="flex items-center p-2 rounded-full hover:bg-gray-100"
            >
                <i class="bx bx-x"></i>
            </button>
        </div>
        
        {#if error}
            <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
                <span class="block sm:inline">{error}</span>
            </div>
        {/if}
    
        <form on:submit|preventDefault={handleSubmit} class="grid grid-cols-2 gap-6">
            <div class="flex flex-col gap-2 col-span-2">
                <label for="project-name" class="text-gray-500 text-sm">Project Name *</label>
                <input 
                    id="project-name"
                    type="text"
                    bind:value={projectName}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                    placeholder="Enter project name"
                    required
                />
            </div>
    
            <div class="flex flex-col gap-2 col-span-2">
                <label for="project-objective" class="text-gray-500 text-sm">Objective</label>
                <textarea
                    id="project-objective"
                    bind:value={objective}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                    placeholder="Enter project objective"
                    rows="3"
                ></textarea>
            </div>
            
            <div class="flex flex-col gap-2 col-span-2">
                <label for="project-industry" class="text-gray-500 text-sm">Industry</label>
                <input 
                    id="project-industry"
                    type="text"
                    bind:value={industry}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                    placeholder="E.g. Technology, Healthcare, Finance"
                />
            </div>
    
            <div class="flex flex-col gap-2">
                <label for="project-outcome" class="text-gray-500 text-sm">Estimated Outcome</label>
                <input 
                    id="project-outcome"
                    type="number"
                    bind:value={estimatedOutcome}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                    placeholder="$0"
                />
            </div>

            <div class="flex flex-col gap-2">
                <label for="project-income" class="text-gray-500 text-sm">Estimated Income</label>
                <input 
                    id="project-income"
                    type="number"
                    bind:value={estimatedIncome}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                    placeholder="$0"
                />
            </div>
    
            <div class="flex flex-col gap-2">
                <label for="project-start-date" class="text-gray-500 text-sm">Start Date</label>
                <input 
                    id="project-start-date"
                    type="date"
                    bind:value={startDate}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                />
            </div>
    
            <div class="flex flex-col gap-2">
                <label for="project-end-date" class="text-gray-500 text-sm">End Date</label>
                <input 
                    id="project-end-date"
                    type="date"
                    bind:value={endDate}
                    class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                />
            </div>
    
            <div class="col-span-2 flex justify-end gap-3">
                <button 
                    type="button" 
                    on:click={close} 
                    class="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 transition-all"
                >
                    Cancel
                </button>
                <button 
                    type="submit" 
                    class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-all flex items-center gap-2"
                    disabled={isSubmitting}
                >
                    {#if isSubmitting}
                        <div class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {/if}
                    Create Project
                </button>
            </div>
        </form>
    </div>
</div>