<script lang="ts">
    import { ucfirst } from '$lib/utils/transform';
    import type { Task } from '$lib/types';
    import { format } from 'date-fns';

    let { id, project_id, title, description, status, position, created_at, updated_at, project_name, handleContextMenu } = $props<Task & { handleContextMenu: () => void }>();
</script>

<div 
    on:click|preventDefault|stopPropagation={handleContextMenu} 
    on:keydown|preventDefault|stopPropagation={(e: KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            handleContextMenu(e);
        }
    }} 
    role="button"
    tabindex="0"
    class="bg-white overflow-hidden rounded-lg shadow-sm hover:shadow transition-all cursor-pointer"
>
    <div class="w-full h-1 {status === 'completed' ? 'bg-green-500' : status === 'in_progress' ? 'bg-yellow-500' : status === 'todo' ? 'bg-blue-500' : 'bg-red-500'}"></div>
    <div class="p-4">
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium {status === 'completed' ? 'line-through' : ''}">{ucfirst(title)}</h3>
            <span class="{status === 'completed' ? 'bg-green-100 text-green-800' : status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' : status === 'todo' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'} px-2 py-0.5 rounded-full text-xs">{ucfirst(status.replace('_', ' '))}</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">{description}</p>
        <!-- <div class="flex items-center gap-2 text-xs text-gray-500">
            <i class="bx bx-time"></i>
            <span>{format(new Date(created_at), 'MMM d, yyyy')}</span>
        </div> -->
    </div>
</div>