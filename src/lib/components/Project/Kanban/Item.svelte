<script lang="ts">
    import { ucfirst } from '$lib/utils/transform';
    let { title, description, task_type, status, position, createdAt, handleContextMenu } = $props();
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
    <div class="w-full h-1 {Math.random() < 0.25 ? 'bg-orange-500' : Math.random() < 0.5 ? 'bg-red-500' : Math.random() < 0.75 ? 'bg-green-500' : 'bg-yellow-500'}"></div>
    <div class="p-4">
        <div class="flex justify-between items-start mb-2">
            <h3 class="font-medium {status === 'done' ? 'line-through' : ''}">{ucfirst(title)}</h3>
            <span class="{task_type === 'epic' ? 'bg-purple-100 text-purple-800' : task_type === 'feature' ? 'bg-blue-100 text-blue-800' : task_type === 'task' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'} px-2 py-0.5 rounded-full text-xs">{ucfirst(task_type)}</span>
        </div>
        <p class="text-sm text-gray-600 mb-3">{description}</p>
        <div class="flex items-center gap-2 text-xs text-gray-500">
            <i class="bx bx-time"></i>
            <span>{createdAt}</span>
        </div>
    </div>
</div>