<script lang="ts">
    import { onMount } from "svelte";
    import Sortable from 'sortablejs';

    import Item from "$lib/components/Project/Kanban/Item.svelte";

    onMount(() => {
        const backlog = document.getElementById('backlog');
        const todo = document.getElementById('todo');
        const inProgress = document.getElementById('in-progress');
        const done = document.getElementById('done');

        new Sortable(backlog!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(todo!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(inProgress!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(done!, {
            group: 'shared',
            animation: 300
        });
    });
</script>

<svelte:head>
    <title>E-Commerce Website</title>
</svelte:head>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-info-circle text-xl text-primary"></i>
                <h2 class="font-medium">Project Details</h2>
            </div>
            <div class="flex gap-2">
                <button class="bg-primary text-white px-4 py-2 rounded hover:bg-darker transition-all">
                    Edit Project
                </button>
                <button class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-all flex items-center gap-2 ml-2">
                    <i class="bx bxl-github"></i>
                    Setup Project Repository
                </button>
            </div>
        </div>
    
        <div class="grid grid-cols-2 gap-6 text-sm">
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Project Name</span>
                <p class="font-medium">E-Commerce Website</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Objective</span>
                <p>Build a modern e-commerce platform with seamless user experience</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Income</span>
                <p class="font-medium text-green-600">$50,000</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Outcome</span>
                <p class="font-medium text-red-600">$30,000</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Start Date</span>
                <p>January 1, 2024</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">End Date</span>
                <p>March 31, 2024</p>
            </div>
            <div class="flex flex-col gap-2 col-span-2">
                <span class="text-gray-500">Github Repository</span>
                <a href="#" class="text-primary hover:text-darker">https://github.com/username/e-commerce</a>
            </div>
        </div>
    </div>
    
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-desktop text-xl text-primary"></i>
                <h2 class="font-medium">Mockup Project</h2>
            </div>
            <button class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-darker transition-all">
                Gave Some Preview
            </button>
        </div>
    
        <div>
            <img src="https://placehold.co/1440x720" alt="" class="rounded-md">
        </div>
    </div>
    
    <h1 class="text-3xl font-semibold text-gray-800">Kanban Board</h1>
    <p class="text-gray-500">Manage your project tasks and progress</p>
    
    <div class="grid grid-cols-4 gap-6">
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-error-circle text-red-500 text-xl"></i>
                    <h2 class="font-medium">Backlog</h2>
                </div>
                <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">3</span>
            </div>
            
            <div id="backlog" class="flex flex-col gap-3 min-h-96">
                <Item
                    title="Setup Payment Gateway"
                    description="Integrate Stripe payment system for secure transactions"
                    task_type="epic"
                    status="backlog"
                    position={1}
                    createdAt="Added 2 days ago"
                />
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Implement Cart System</h3>
                        <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Feature</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Create shopping cart functionality with real-time updates</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Added 3 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-list-ul text-blue-500 text-xl"></i>
                    <h2 class="font-medium">Todo</h2>
                </div>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">5</span>
            </div>
    
            <div id="todo" class="flex flex-col gap-3 min-h-96">
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Design Product Page</h3>
                        <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Feature</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Create responsive layout for product details</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Added 1 day ago</span>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Setup Product Filters</h3>
                        <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Task</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Implement category and price range filters</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Added 1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-loader text-yellow-500 text-xl"></i>
                    <h2 class="font-medium">In Progress</h2>
                </div>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">2</span>
            </div>
    
            <div id="in-progress" class="flex flex-col gap-3 min-h-96">
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">User Authentication</h3>
                        <span class="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs">Epic</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Implement login and registration system</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Started 3 days ago</span>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Social Login Integration</h3>
                        <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Feature</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Add Google and Facebook login options</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Started 1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-check-double text-green-500 text-xl"></i>
                    <h2 class="font-medium">Done</h2>
                </div>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">8</span>
            </div>
            <div id="done" class="flex flex-col gap-3 min-h-96">
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Project Setup</h3>
                        <span class="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Task</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Initialize project and configure development environment</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Completed 1 week ago</span>
                    </div>
                </div>
                <div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-medium">Database Schema Design</h3>
                        <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs">Feature</span>
                    </div>
                    <p class="text-sm text-gray-600 mb-3">Create initial database structure and relationships</p>
                    <div class="flex items-center gap-2 text-xs text-gray-500">
                        <i class="bx bx-time"></i>
                        <span>Completed 5 days ago</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>