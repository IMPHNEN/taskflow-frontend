<script lang="ts">
    let { close } = $props();
    
    let projectName = '';
    let objective = '';
    let estimatedIncome = '';
    let estimatedOutcome = '';
    let startDate = '';
    let endDate = '';
</script>

<div on:click|stopPropagation class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
    <div class="flex items-center justify-between gap-3">
        <div class="flex items-center gap-2">
            <i class="bx bx-plus-circle text-xl text-primary"></i>
            <h2 class="font-medium">Create New Project</h2>
        </div>
        <button on:click={close} class="flex items-center p-2 rounded-full hover:bg-gray-100">
            <i class="bx bx-x"></i>
        </button>
    </div>

    <form class="grid grid-cols-2 gap-6">
        <div class="flex flex-col gap-2 col-span-2">
            <label class="text-gray-500 text-sm">Project Name</label>
            <input 
                type="text"
                bind:value={projectName}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                placeholder="Enter project name"
            />
        </div>

        <div class="flex flex-col gap-2 col-span-2">
            <label class="text-gray-500 text-sm">Objective</label>
            <textarea
                bind:value={objective}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                placeholder="Enter project objective"
                rows="3"
            ></textarea>
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-gray-500 text-sm">Estimated Income</label>
            <input 
                type="number"
                bind:value={estimatedIncome}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                placeholder="$0"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-gray-500 text-sm">Estimated Outcome</label>
            <input 
                type="number"
                bind:value={estimatedOutcome}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
                placeholder="$0"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-gray-500 text-sm">Start Date</label>
            <input 
                type="date"
                bind:value={startDate}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            />
        </div>

        <div class="flex flex-col gap-2">
            <label class="text-gray-500 text-sm">End Date</label>
            <input 
                type="date"
                bind:value={endDate}
                class="border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-primary"
            />
        </div>

        <div class="col-span-2 flex justify-end">
            <button type="submit" class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-all">
                Create Project
            </button>
        </div>
    </form>
</div>