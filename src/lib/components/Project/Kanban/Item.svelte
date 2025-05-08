<script lang="ts">
    let { title, description, task_type, status, position, createdAt } = $props();
</script>

<div class="bg-white p-4 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer">
    <div class="flex justify-between items-start mb-2">
        <h3 class="font-medium">{title}</h3>
        <span class="{task_type === 'epic' ? 'bg-purple-100 text-purple-800' : task_type === 'feature' ? 'bg-blue-100 text-blue-800' : task_type === 'task' ? 'bg-green-100 text-green-800' : 'bg-green-100 text-green-800'} px-2 py-0.5 rounded-full text-xs">{task_type}</span>
    </div>
    <p class="text-sm text-gray-600 mb-3">{description}</p>
    <div class="flex items-center gap-2 text-xs text-gray-500">
        <i class="bx bx-time"></i>
        <span>{createdAt}</span>
    </div>
</div>