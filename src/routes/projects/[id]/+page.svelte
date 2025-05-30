<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Sortable from "sortablejs";
    import { format } from "date-fns";
    import { writable, derived } from "svelte/store";

    export const ssr = false;

    import Item from "$lib/components/Project/Kanban/Item.svelte";
    import Modal from "$lib/components/Project/Kanban/Modal.svelte";
    import Market from "$lib/components/Project/Market.svelte";
    import Prd from "$lib/components/Project/Prd.svelte";

    import {
        generateProjectScope,
        loadProject,
        setupRepository,
        validateMarketFit,
    } from "$lib/actions";
    import type { ProjectDetail, Task } from "$lib/types";
    import { TaskStatus } from "$lib/types";
    import { projectStore } from "$lib/stores";
    import Brd from "$lib/components/Project/Brd.svelte";
    import { TaskService } from "$lib/service";

    // Map frontend status to backend status
    const mapToBackendStatus = (status: TaskStatus): string => {
        switch (status) {
            case TaskStatus.COMPLETED:
                return 'done';
            default:
                return status;
        }
    };

    // Map backend status to frontend status
    const mapToFrontendStatus = (status: string): TaskStatus => {
        switch (status) {
            case 'done':
                return TaskStatus.COMPLETED;
            default:
                return status as TaskStatus;
        }
    };

    let showModal = $state(false);
    let showPRD = $state(false);
    let showBRD = $state(false);
    let showGithubTnc = $state(false);

    let project = $state<ProjectDetail | null>(null);
    let loading = $state(true);
    let error = $state("");

    // Create a writable store for tasks
    const tasksStore = writable<Record<TaskStatus, Task[]>>({
        [TaskStatus.BACKLOG]: [],
        [TaskStatus.TODO]: [],
        [TaskStatus.IN_PROGRESS]: [],
        [TaskStatus.COMPLETED]: []
    });

    // Create a derived store for sorted tasks
    const sortedTasks = derived(tasksStore, ($tasks) => {
        const sorted: Record<TaskStatus, Task[]> = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.COMPLETED]: []
        };

        Object.entries($tasks).forEach(([status, tasks]) => {
            sorted[status as TaskStatus] = [...tasks].sort((a, b) => a.position - b.position);
        });

        return sorted;
    });

    // Subscribe to the project store
    const unsubscribe = projectStore.subscribe((state) => {
        project = state.currentProject;
        loading = state.isLoading;
        error = state.error || "";
    });

    async function fetchTasksByStatus() {
        if (!project) return;
        
        try {
            const allTasks = await TaskService.listTasks(project.id);
            const groupedTasks = allTasks.reduce((acc, task) => {
                const frontendStatus = mapToFrontendStatus(task.status);
                if (!acc[frontendStatus]) {
                    acc[frontendStatus] = [];
                }
                acc[frontendStatus].push({
                    ...task,
                    status: frontendStatus
                });
                return acc;
            }, {} as Record<TaskStatus, Task[]>);

            // Update the tasks store
            tasksStore.set({
                [TaskStatus.BACKLOG]: groupedTasks[TaskStatus.BACKLOG] || [],
                [TaskStatus.TODO]: groupedTasks[TaskStatus.TODO] || [],
                [TaskStatus.IN_PROGRESS]: groupedTasks[TaskStatus.IN_PROGRESS] || [],
                [TaskStatus.COMPLETED]: groupedTasks[TaskStatus.COMPLETED] || []
            });
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
            error = "Failed to load tasks";
        }
    }

    onMount(() => {
        (async () => {
            try {
                // Fetch projects and tasks in parallel
                await loadProject($page.params.id);
                await fetchTasksByStatus();
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            }
        })();

        return unsubscribe;
    });

    // Initialize Sortable and handle task reordering
    $effect(() => {
        if (!loading && project) {
            setTimeout(() => {
                const columns = [
                    TaskStatus.BACKLOG,
                    TaskStatus.TODO,
                    TaskStatus.IN_PROGRESS,
                    TaskStatus.COMPLETED
                ];
                
                columns.forEach(status => {
                    const el = document.getElementById(status);
                    if (el) {
                        new Sortable(el, {
                            group: "shared",
                            animation: 300,
                            onEnd: async (evt) => {
                                const taskId = evt.item.getAttribute('data-task-id');
                                const newStatus = evt.to.id as TaskStatus;
                                const oldStatus = evt.from.id as TaskStatus;
                                
                                if (!taskId || !project) return;

                                try {
                                    // Update task status
                                    await TaskService.updateTask(project.id, taskId, {
                                        status: mapToBackendStatus(newStatus),
                                        position: evt.newIndex
                                    });

                                    // Get current tasks
                                    let currentTasks: Record<TaskStatus, Task[]> = {
                                        [TaskStatus.BACKLOG]: [],
                                        [TaskStatus.TODO]: [],
                                        [TaskStatus.IN_PROGRESS]: [],
                                        [TaskStatus.COMPLETED]: []
                                    };
                                    tasksStore.subscribe(tasks => {
                                        currentTasks = tasks;
                                    })();

                                    // Reorder tasks in the new column
                                    const tasks = currentTasks[newStatus];
                                    
                                    const taskOrders = tasks.map((task: Task, index: number) => ({
                                        task_id: task.id,
                                        position: index
                                    }));

                                    await TaskService.reorderTasks(project.id, taskOrders);

                                    // Reload tasks to get updated order
                                    await fetchTasksByStatus();
                                } catch (err) {
                                    console.error('Failed to update task:', err);
                                    // Reload tasks to reset the view
                                    await fetchTasksByStatus();
                                }
                            }
                        });
                    }
                });
            }, 0);
        }
    });

    function formatDate(dateString: string | null | undefined) {
        if (!dateString) return "";
        return format(new Date(dateString), "MMM dd, yyyy");
    }
</script>

<svelte:head>
    <title>E-Commerce Website</title>
</svelte:head>

<div class="flex flex-col gap-4">
    {#if loading}
        <div class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p class="text-gray-600">Loading project data...</p>
        </div>
    {:else if error}
        <div class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow">
            <i class="bx bx-error-circle text-4xl text-red-500 mb-2"></i>
            <p class="text-gray-600">{error}</p>
        </div>
    {:else if !project}
        <div class="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow">
            <i class="bx bx-error-circle text-4xl text-red-500 mb-2"></i>
            <p class="text-gray-600">Project not found</p>
        </div>
    {:else}
        <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <i class="bx bx-info-circle text-xl text-primary"></i>
                    <h2 class="font-medium">Project Details</h2>
                </div>
                <div class="flex gap-2">
                    <button
                        class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                    >
                        Edit Project
                    </button>
                    <button
                        on:click={() => (showGithubTnc = true)}
                        class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-all flex items-center gap-2 ml-2"
                    >
                        <i class="bx bxl-github"></i>
                        Setup Project Repository
                    </button>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-6 grid-flow-row text-sm">
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Project Name</span>
                    <p class="font-medium">{project.name}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Objective</span>
                    <p>{project.objective}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Estimated Outcome</span>
                    <p class="font-medium text-red-600">
                        ${project.estimated_outcome}
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Estimated Income</span>
                    <p class="font-medium text-green-600">
                        ${project.estimated_income}
                    </p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Start Date</span>
                    <p>{formatDate(project.start_date)}</p>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">End Date</span>
                    <p>{formatDate(project.end_date)}</p>
                </div>
                {#if project.github_setup}
                    <div class="flex flex-col gap-2 col-span-2">
                        <span class="text-gray-500">Github Repository</span>
                        <a
                            href={project.github_setup.repository_url}
                            class="text-primary hover:text-secondary"
                            >{project.github_setup.repository_url}</a
                        >
                    </div>
                {/if}
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Business Requirements Detail</span>
                    <button
                        on:click={() => (showBRD = true)}
                        class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                    >
                        View
                    </button>
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-gray-500">Product Requirements Detail</span>
                    <button
                        on:click={() => (showPRD = true)}
                        class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                    >
                        View
                    </button>
                </div>
            </div>
        </div>

        <div
            class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow relative z-0"
        >
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <i class="bx bx-desktop text-xl text-primary"></i>
                    <h2 class="font-medium">Mockup Project</h2>
                </div>
                <button
                    disabled
                    class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                >
                    Gave Some Preview
                </button>
            </div>

            <h3 class="text-3xl text-center">Incoming...</h3>
        </div>

        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-3xl font-semibold text-gray-800">Kanban Board</h1>
                <p class="text-gray-500">Manage your project tasks and progress</p>
            </div>
            <button
                on:click={() => generateProjectScope(project!.id)} 
                class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
            >
                Generate Tasks
            </button>
        </div>

        {#if !project?.tasks_generated || project?.tasks_generated.length === 0}
            <div class="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow">
                <i class="bx bx-task text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
                <p class="text-gray-500">Let's generate some tasks to make our project more organized!</p>
            </div>
        {:else}
            <div class="grid grid-cols-4 gap-6 overflow-hidden">
                {#each [TaskStatus.BACKLOG, TaskStatus.TODO, TaskStatus.IN_PROGRESS, TaskStatus.COMPLETED] as status}
                    <div class="flex flex-col gap-4 h-[calc(100vh-16rem)]">
                        <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow sticky top-0 z-10">
                            <div class="flex items-center gap-2">
                                {#if status === TaskStatus.BACKLOG}
                                    <i class="bx bx-list-ul text-red-500 text-xl"></i>
                                {:else if status === TaskStatus.TODO}
                                    <i class="bx bx-list-ul text-blue-500 text-xl"></i>
                                {:else if status === TaskStatus.IN_PROGRESS}
                                    <i class="bx bx-loader text-yellow-500 text-xl"></i>
                                {:else if status === TaskStatus.COMPLETED}
                                    <i class="bx bx-check-double text-green-500 text-xl"></i>
                                {/if}
                                <h2 class="font-medium capitalize">{status.replace('_', ' ')}</h2>
                            </div>
                            <span class="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                                {$tasksStore[status]?.length || 0}
                            </span>
                        </div>

                        <div id={status} class="flex flex-col gap-3 overflow-y-auto pr-2 min-h-[400px]">
                            {#each $sortedTasks[status] as task}
                                <div data-task-id={task.id}>
                                    <Item
                                        {...task}
                                        handleContextMenu={() => (showModal = true)}
                                    />
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            </div>
        {/if}
        <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                    <i class="bx bx-search text-xl text-primary"></i>
                    <h2 class="font-medium">Market Research</h2>
                </div>
                {#if project?.market_research?.status === "not_started" || !project?.market_research}
                    <button
                        on:click={() => validateMarketFit(project!.id)}
                        class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                    >
                        Generate Market Research
                    </button>
                {:else if project?.market_research?.status === "in_progress"}
                    <div class="flex items-center gap-2">
                        <div
                            class="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"
                        ></div>
                        <span class="text-gray-600">Generating...</span>
                    </div>
                {:else if project?.market_research?.status === "failed"}
                    <button
                        on:click={() => validateMarketFit(project!.id)}
                        class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all"
                    >
                        Try Again
                    </button>
                {/if}
            </div>

            {#if project?.market_research?.status === "completed" && project?.market_research?.report_markdown}
                <Market markdown={project?.market_research?.report_markdown} />
            {:else if project?.market_research?.status === "in_progress"}
                <div class="flex flex-col items-center justify-center py-8">
                    <div
                        class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"
                    ></div>
                    <p class="text-gray-600">Generating market research...</p>
                </div>
            {:else if project?.market_research?.status === "failed"}
                <div class="flex flex-col items-center justify-center py-8">
                    <i class="bx bx-error-circle text-4xl text-red-500 mb-2"></i>
                    <p class="text-gray-600">Failed to generate market research</p>
                </div>
            {:else}
                <div class="flex flex-col items-center justify-center py-8">
                    <i class="bx bx-search text-4xl text-gray-400 mb-2"></i>
                    <p class="text-gray-600">No market research available</p>
                </div>
            {/if}
        </div>
    {/if}
</div>

{#if showModal}
    <Modal close={() => (showModal = false)} />
{/if}

{#if showBRD}
    <Brd brd={project?.brd} id={project!.id} close={() => (showBRD = false)} />
{/if}

{#if showPRD}
    <Prd prd={project?.prd} id={project!.id} close={() => (showPRD = false)} />
{/if}

{#if showGithubTnc}
    <div
        class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
        <div class="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <div class="flex items-center justify-between mb-4">
                <h3 class="text-xl font-semibold">GitHub Terms & Conditions</h3>
                <button
                    class="text-gray-500 hover:text-gray-700"
                    on:click={() => (showGithubTnc = false)}
                >
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>

            <div class="prose prose-sm max-h-96 overflow-y-auto mb-4">
                <p>By connecting your GitHub account, you agree to:</p>
                <ul class="list-disc pl-4 space-y-2">
                    <li>Grant read-only access to your public repositories</li>
                    <li>Allow us to store relevant repository data</li>
                    <li>
                        Use this data for project analysis and recommendations
                    </li>
                    <li>Maintain the confidentiality of your sensitive data</li>
                </ul>
                <p class="mt-4">We will not:</p>
                <ul class="list-disc pl-4 space-y-2">
                    <li>Access your private repositories</li>
                    <li>Make changes to your repositories</li>
                    <li>Share your data with third parties</li>
                </ul>
            </div>

            <div class="flex justify-end gap-3">
                <button
                    class="px-4 py-2 text-gray-600 hover:text-gray-800"
                    on:click={() => (showGithubTnc = false)}
                >
                    Cancel
                </button>
                <button
                    class="px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition-colors"
                    on:click={() => {
                        showGithubTnc = false;
                        // Add GitHub connection logic here
                    }}
                >
                    Agree & Continue
                </button>
            </div>
        </div>
    </div>
{/if}
