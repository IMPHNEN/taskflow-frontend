<script lang="ts">
    let { close } = $props();
    
    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            close();
        }
    }
</script>

<div 
    role="dialog" 
    aria-labelledby="edit-task-title"
    on:click={close} 
    on:keydown={handleKeydown}
    tabindex="0" 
    class="fixed top-0 left-0 w-full h-full bg-black/30 flex items-center justify-center z-50"
>
    <div 
        role="none" 
        on:click|stopPropagation 
        on:keydown|stopPropagation
        class="flex flex-col gap-4 bg-white rounded-lg shadow w-1/2 overflow-hidden"
    >
        <div class="w-full h-8 {Math.random() < 0.25 ? 'bg-orange-500' : Math.random() < 0.5 ? 'bg-red-500' : Math.random() < 0.75 ? 'bg-green-500' : 'bg-yellow-500'}"></div>
        <div class="flex flex-col gap-4 bg-white pb-4 px-4">
            <div class="flex items-center justify-between gap-3">
                <div class="flex items-center gap-2">
                    <i class="bx bx-edit text-xl text-secondary"></i>
                    <h2 id="edit-task-title" class="font-medium">Edit Task</h2>
                </div>
                <button on:click={close} aria-label="Close dialog" class="flex items-center p-2 rounded-full hover:bg-gray-100">
                    <i class="bx bx-x"></i>
                </button>
            </div>
        
            <form class="grid grid-cols-2 gap-6">
                <div class="flex flex-col gap-2 col-span-2">
                    <label for="task-title" class="text-gray-500 text-sm">Title</label>
                    <input 
                        id="task-title"
                        type="text"
                        class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                        placeholder="Edit task title"
                    />
                </div>
    
                <div class="flex flex-col gap-2 col-span-2">
                    <span id="label-group" class="text-gray-500 text-sm">Label</span>
                    <div class="flex gap-2" role="group" aria-labelledby="label-group">
                        <button type="button" class="px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800 hover:bg-orange-200">Orange</button>
                        <button type="button" class="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 hover:bg-red-200">Red</button>
                        <button type="button" class="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 hover:bg-green-200">Green</button>
                        <button type="button" class="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Yellow</button>
                    </div>
                </div>
    
                <div class="flex flex-col gap-2 col-span-2">
                    <label for="task-description" class="text-gray-500 text-sm">Description</label>
                    <textarea
                        id="task-description"
                        class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                        placeholder="Edit task description"
                        rows="3"
                    ></textarea>
                </div>
    
                <div class="flex flex-col gap-2 col-span-2">
                    <label for="checklist-input" class="text-gray-500 text-sm">Checklist</label>
                    <input 
                        id="checklist-input"
                        type="text"
                        class="flex-1 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                        placeholder="Add checklist item"
                    />
                    <div class="flex items-center gap-2">
                        <input id="checklist-item-1" type="checkbox" class="rounded text-primary focus:ring-primary">
                        <label for="checklist-item-1" class="text-gray-500 font-light">Checklist item 1</label>
                    </div>
                    <div class="flex items-center gap-2">
                        <input checked id="checklist-item-2" type="checkbox" class="rounded text-primary focus:ring-primary peer">
                        <label for="checklist-item-2" class="text-gray-500 font-light peer-checked:line-through">Checklist item 2</label>
                    </div>
                </div>
    
                <div class="col-span-2 flex justify-end gap-2">
                    <button type="button" on:click={close} class="px-4 py-2 rounded-lg hover:bg-gray-100">Cancel</button>
                    <button type="submit" class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary">Save Changes</button>
                </div>
            </form>
        </div>
    </div>
</div>