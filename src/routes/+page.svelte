<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
</script>

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<div class="flex flex-col">
    <!-- Statistics Dashboard -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Total Projects</p>
                    <h3 class="text-2xl font-bold mt-2">24</h3>
                </div>
                <div class="flex itms-center bg-blue-100 p-3 rounded-full">
                    <i class="bx bx-folder text-blue-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-green-600 text-sm">
                <i class="bx bx-up-arrow-alt"></i>
                <span>12% increase</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">In Progress</p>
                    <h3 class="text-2xl font-bold mt-2">8</h3>
                </div>
                <div class="flex itms-center bg-yellow-100 p-3 rounded-full">
                    <i class="bx bx-loader text-yellow-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-red-600 text-sm">
                <i class="bx bx-down-arrow-alt"></i>
                <span>3% decrease</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Completed</p>
                    <h3 class="text-2xl font-bold mt-2">12</h3>
                </div>
                <div class="flex itms-center bg-green-100 p-3 rounded-full">
                    <i class="bx bx-check-circle text-green-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-green-600 text-sm">
                <i class="bx bx-up-arrow-alt"></i>
                <span>8% increase</span>
            </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow-sm">
            <div class="flex items-center justify-between">
                <div>
                    <p class="text-gray-500 text-sm">Overdue</p>
                    <h3 class="text-2xl font-bold mt-2">4</h3>
                </div>
                <div class="flex itms-center bg-red-100 p-3 rounded-full">
                    <i class="bx bx-time text-red-600 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-red-600 text-sm">
                <i class="bx bx-up-arrow-alt"></i>
                <span>2% increase</span>
            </div>
        </div>

        <!-- ?: Chart section Neeed? -->
        <!-- <div class="bg-white p-6 rounded-lg shadow-sm mt-6">
            <h2 class="text-xl font-semibold mb-4">Project Progress Overview</h2>
            <div class="h-80">
            </div>
        </div> -->
    </div>
</div>
