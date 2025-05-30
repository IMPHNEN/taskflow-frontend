<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Project } from '$lib/types';
    import { formatDistanceToNow, format } from 'date-fns';
    import { deleteProject } from '$lib/actions';

    export let project: Project;

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return 'Not set';
        return format(new Date(dateString), 'd MMM, yyyy');
    };

    const formatTimeAgo = (dateString: string) => {
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    };

    const handleDelete = async (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        
        if (confirm('Are you sure you want to delete this project?')) {
            await deleteProject(project.id);
        }
    };

    const handleEdit = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        goto(`/projects/${project.id}/edit`);
    };
</script>

<a href="/projects/{project.id}" class="relative group overflow-hidden flex flex-col gap-4 p-4 rounded-xl border-gray-100 border border-b-0 hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
    <div class="flex justify-between items-center">
        <div class="flex flex-col gap-2">
            <h1>{project.name}</h1>
            <div class="flex items-center gap-1 text-xs text-gray-500">
                <i class="bx bx-time"></i>
                <span>{formatTimeAgo(project.created_at)}</span>
            </div>
        </div>
        <div class="relative group/dropdown hover:bg-gray-100 rounded-full px-1 pt-1">
            <button on:click|preventDefault|stopPropagation class="peer" aria-label="Project options">
                <i class="bx bx-dots-horizontal-rounded text-xl"></i>
            </button>
            <div class="absolute right-0 top-8 bg-white shadow-lg rounded-lg p-2 w-40 border border-gray-100 hidden peer-focus:block">
                <button on:click={handleEdit} class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                    <i class="bx bx-edit"></i>
                    <span>Edit Project</span>
                </button>
                <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                    <i class="bx bx-info-circle"></i>
                    <span>Something ...</span>
                </button>
                <button on:click={handleDelete} class="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                    <i class="bx bx-trash"></i>
                    <span>Delete Project</span>
                </button>
            </div>
        </div>
    </div>
    <div class="flex flex-col gap-4 text-sm text-gray-700 bg-gray-50 rounded-lg">
        <!-- ? another information -->
        <!-- <div class="flex justify-between items-center hover:bg-white p-2 rounded transition-colors">
            <div class="flex items-center gap-3">
                <i class="bx bx-time text-xl text-orange-500"></i>
                <span class="font-medium">Backlog</span>
            </div>
            <span class="bg-orange-100 text-orange-600 px-3 py-1 rounded-full font-medium">3</span>
        </div>
        <div class="flex justify-between items-center hover:bg-white p-2 rounded transition-colors">
            <div class="flex items-center gap-3">
                <i class="bx bx-list-ul text-xl text-blue-500"></i>
                <span class="font-medium">Todo</span>
            </div>
            <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">5</span>
        </div>
        <div class="flex justify-between items-center hover:bg-white p-2 rounded transition-colors">
            <div class="flex items-center gap-3">
                <i class="bx bx-loader text-xl text-yellow-500"></i>
                <span class="font-medium">Progress</span>
            </div>
            <span class="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full font-medium">2</span>
        </div>
        <div class="flex justify-between items-center hover:bg-white p-2 rounded transition-colors">
            <div class="flex items-center gap-3">
                <i class="bx bx-check-circle text-xl text-green-500"></i>
                <span class="font-medium">Done</span>
            </div>
            <span class="bg-green-100 text-green-600 px-3 py-1 rounded-full font-medium">8</span>
        </div> -->
        <div>
            <p>
            {project.objective}
            </p>
        </div>
    </div>
    <div class="flex gap-2 flex-wrap">
        <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <i class="bx bx-error-circle"></i>
            {Math.floor(Math.random() * 10)} Backlog
        </div>
        <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <i class="bx bx-list-ul"></i>
            {Math.floor(Math.random() * 10)} Todo
        </div>
        <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <i class="bx bx-loader"></i>
            {Math.floor(Math.random() * 10)} In Progress
        </div>
        <div class="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <i class="bx bx-check-double"></i>
            {Math.floor(Math.random() * 10)} Done
        </div>
    </div>

    <div class="flex items-center gap-1 font-light text-gray-500 text-xs">
        <i class="bx bx-calendar-alt"></i>
        <span>{formatDate(project.start_date)}</span>
        <span>-</span>
        <span>{formatDate(project.end_date)}</span>
    </div>

    <button class="bg-primary mt-4 rounded-lg text-white text-center py-3 w-full hover:bg-secondary transition-all duration-300 font-medium hover:shadow-md">
        View Details
    </button>
    <div class="group-hover:-translate-y-2 transition-transform duration-300 absolute -bottom-4 left-0 w-full h-4 bg-primary">

    </div>
</a>