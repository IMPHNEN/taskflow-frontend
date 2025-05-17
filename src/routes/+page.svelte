<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
    import { ucfirst } from '$lib/utils/transform';
    import { onMount } from 'svelte';
    import { projectStore, taskStore } from '$lib/stores';
    import { fetchProjects, loadAllTasks, processTasksForChart, calculateOverdueProjects } from '$lib/actions';
    import type { Project, Task } from '$lib/types';
    import { ProjectStatus, TaskStatus } from '$lib/types';
    import { format, formatDistanceToNow } from 'date-fns';

    // @ts-ignore
    import { chart } from "svelte-apexcharts";
    
    let projects: Project[] = [];
    let tasks: Task[] = [];
    let loading = true;
    let chartData = {
        series: [{
            name: 'Tasks',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }, {
            name: 'Completed',
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        }],
        chart: {
            height: 350,
            type: 'area'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            type: 'datetime',
            categories: Array(10).fill(0).map((_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - (9 - i));
                return date.toISOString();
            })
        },
        tooltip: {
            x: {
                format: 'MMM dd, yyyy'
            },
        },
        colors: ['#f44336', '#2fcc71']
    };
    
    // Subscribe to stores
    const unsubscribeProject = projectStore.subscribe(state => {
        projects = state.projects;
        loading = state.isLoading;
        
        // Calculate overdue projects whenever projects change
        if (projects.length > 0) {
            overdueProjects = calculateOverdueProjects(projects);
        }
    });
    
    const unsubscribeTask = taskStore.subscribe(state => {
        tasks = state.tasks;
        
        // Update chart data whenever tasks change
        if (tasks.length > 0) {
            const data = processTasksForChart(tasks);
            chartData = {
                ...chartData,
                series: data.series,
                xaxis: {
                    ...chartData.xaxis,
                    categories: data.categories
                }
            };
        }
    });
    
    onMount(() => {
        // Start async work in IIFE
        (async () => {
            try {
                // Fetch projects and tasks in parallel
                await Promise.all([
                    fetchProjects(),
                    loadAllTasks()
                ]);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            }
        })();
        
        // Return cleanup function synchronously
        return () => {
            unsubscribeProject();
            unsubscribeTask();
        };
    });
    
    // Calculate stats
    $: totalProjects = projects.length;
    $: inProgressProjects = projects.filter(p => p.status === ProjectStatus.IN_PROGRESS).length;
    $: completedProjects = projects.filter(p => p.status === ProjectStatus.COMPLETED).length;
    $: overdueProjects = calculateOverdueProjects(projects);
    
    // Format dates for display
    function formatDate(dateString: string) {
        return format(new Date(dateString), 'MMM dd, yyyy');
    }
    
    function formatTimeAgo(dateString: string) {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    }
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div class="flex flex-col gap-4">
    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Total Projects</p>
                    <h3 class="text-2xl font-bold mt-2">{totalProjects}</h3>
                </div>
                <div class="flex itms-center bg-blue-100 p-3 rounded-full">
                    <i class="bx bx-folder text-blue-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-green-600 text-sm">
                <i class="bx bx-up-arrow-alt"></i>
                <span>Projects created</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">In Progress</p>
                    <h3 class="text-2xl font-bold mt-2">{inProgressProjects}</h3>
                </div>
                <div class="flex itms-center bg-yellow-100 p-3 rounded-full">
                    <i class="bx bx-loader text-yellow-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-gray-700 text-sm">
                <i class="bx bx-info-circle"></i>
                <span>Active projects</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Completed</p>
                    <h3 class="text-2xl font-bold mt-2">{completedProjects}</h3>
                </div>
                <div class="flex itms-center bg-green-100 p-3 rounded-full">
                    <i class="bx bx-check-circle text-green-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-green-600 text-sm">
                <i class="bx bx-badge-check"></i>
                <span>Finished projects</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Overdue</p>
                    <h3 class="text-2xl font-bold mt-2">{overdueProjects}</h3>
                </div>
                <div class="flex itms-center bg-red-100 p-3 rounded-full">
                    <i class="bx bx-time text-gray-700 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-gray-700 text-sm">
                <i class="bx bx-calendar-exclamation"></i>
                <span>Past deadline</span>
            </div>
        </div>

    </div>

    <div class="w-full grid grid-cols-3 grid-rows-2 gap-4 min-h-96">

        <div class="bg-white shadow-sm col-span-2 p-4" use:chart={chartData}>
        </div>

        <div class="bg-white shadow-sm rounded-md row-span-2">
            <h1 class="m-4 text-xl font-medium">Activities</h1>
            {#if loading}
                <div class="flex justify-center items-center py-12">
                    <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
            {:else if tasks.length === 0}
                <div class="flex flex-col items-center justify-center py-12 text-center">
                    <i class="bx bx-task text-gray-400 text-4xl mb-2"></i>
                    <p class="text-gray-500">No tasks yet</p>
                </div>
            {:else}
                <div class="flex flex-col mt-4">
                    {#each tasks as task}
                        <div class="flex items-center gap-3 hover:bg-black/5 p-3 transition-colors">
                            <div class="flex items-center
                                {task.status === TaskStatus.TODO ? 'bg-blue-100' : 
                                task.status === TaskStatus.IN_PROGRESS ? 'bg-yellow-100' : 
                                'bg-green-100'} p-2 rounded-full">
                                <i class="bx 
                                    {task.status === TaskStatus.TODO ? 'bx-list-ul text-blue-600' : 
                                    task.status === TaskStatus.IN_PROGRESS ? 'bx-loader text-yellow-600' : 
                                    'bx-check-double text-green-600'}">
                                </i>
                            </div>
                            <div class="flex-1">
                                <div class="flex items-center gap-2">
                                    <p class="text-sm">{task.title}</p>
                                    <span class="bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full text-xs">
                                        {task.project_name || 'Unknown project'}
                                    </span>
                                </div>
                                <p class="text-xs text-gray-500">{formatTimeAgo(task.created_at)}</p>
                            </div>
                        </div>
                    {/each}
                </div>
            {/if}
        </div>

        <div class="col-span-2 bg-white shadow-sm rounded-md">
            <div class="flex items-center justify-between m-4">
                <h1 class="text-xl font-medium">Recent Projects</h1>
                <a href="/projects" class="text-primary hover:underline text-sm">View All</a>
            </div>
            <div class="grid grid-cols-2 gap-4 p-4">
                {#if loading}
                    <div class="col-span-2 flex justify-center items-center py-12">
                        <div class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                    </div>
                {:else if projects.length === 0}
                    <div class="col-span-2 flex flex-col items-center justify-center py-12 text-center">
                        <i class="bx bx-folder-open text-gray-400 text-4xl mb-2"></i>
                        <p class="text-gray-500">No projects yet</p>
                        <a href="/projects" class="text-primary hover:underline mt-2">Create your first project</a>
                    </div>
                {:else}
                    {#each projects.slice(0, 4) as project}
                        <a href="/projects/{project.id}" class="flex flex-col p-4 border border-gray-100 rounded-lg hover:border-primary hover:shadow-sm transition-all">
                            <h3 class="font-medium">{project.name}</h3>
                            <p class="text-xs text-gray-500 line-clamp-2 mt-1">{project.description}</p>
                            <div class="flex items-center gap-2 mt-3">
                                <span class="px-2 py-0.5 rounded-full text-xs 
                                    {project.status === ProjectStatus.IN_PROGRESS ? 'bg-yellow-100 text-yellow-800' : 
                                    project.status === ProjectStatus.COMPLETED ? 'bg-green-100 text-green-800' : 
                                    project.status === ProjectStatus.ON_HOLD ? 'bg-orange-100 text-orange-800' : 
                                    project.status === ProjectStatus.CANCELLED ? 'bg-red-100 text-red-800' : 
                                    'bg-blue-100 text-blue-800'}">
                                    {project.status || ProjectStatus.PLANNING}
                                </span>
                                <span class="text-xs text-gray-500">{formatDate(project.created_at)}</span>
                            </div>
                        </a>
                    {/each}
                {/if}
            </div>
        </div>
    </div>
</div>
