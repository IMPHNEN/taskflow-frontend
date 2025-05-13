<script lang="ts">
    import ProjectCard from '$lib/components/Project/Card.svelte';
    import { ucfirst } from '$lib/utils/transform';

    // @ts-ignore;
    import { chart } from "svelte-apexcharts";
    
    let options = {
          series: [{
              name: 'Tasks',
              data: [10, 25, 35, 15, 45, 20, 40, 12, 38, 18]
            }, {
            name: 'Dones', 
            data: [45, 30, 20, 40, 15, 35, 18, 42, 22, 38]
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
          categories: ["2024-05-03T00:00:00.000Z", "2024-05-06T00:00:00.000Z", "2024-05-09T00:00:00.000Z", "2024-05-12T00:00:00.000Z", "2024-05-15T00:00:00.000Z", "2024-05-18T00:00:00.000Z", "2024-05-21T00:00:00.000Z", "2024-05-24T00:00:00.000Z", "2024-05-27T00:00:00.000Z", "2024-05-30T00:00:00.000Z"]
        },
        tooltip: {
          x: {
            format: 'MMM dd, yyyy'
          },
        },
        colors: ['red', '#2fcc71']
        };

    const tasks = [
        {
            title: "Setup Payment Gateway",
            description: "Integrate Stripe payment system for secure transactions",
            task_type: "epic",
            status: "backlog",
            createdAt: "2 days ago"
        },
        {
            title: "Implement Cart System",
            description: "Create shopping cart functionality with real-time updates", 
            task_type: "feature",
            status: "in-progress",
            createdAt: "5 hours ago"
        },
        {
            title: "Design Product Page",
            description: "Create responsive layout for product details",
            task_type: "feature", 
            status: "done",
            createdAt: "1 week ago"
        },
        {
            title: "Setup Product Filters",
            description: "Implement category and price range filters",
            task_type: "task",
            status: "todo",
            createdAt: "3 days ago"
        },
        {
            title: "User Authentication",
            description: "Implement login and registration system",
            task_type: "epic", 
            status: "todo",
            createdAt: "12 hours ago"
        },
        {
            title: "Social Login Integration", 
            description: "Add Google and Facebook login options",
            task_type: "feature",
            status: "backlog",
            createdAt: "1 day ago"
        },
        {
            title: "Project Setup",
            description: "Initialize project and configure development environment",
            task_type: "task",
            status: "in-progress",
            createdAt: "4 days ago"
        },
        {
            title: "Database Schema Design",
            description: "Create initial database structure and relationships",
            task_type: "feature",
            status: "done",
            createdAt: "2 weeks ago"
        }
    ];
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
            <div class="flex items-center gap-1 mt-4 text-gray-700 text-sm">
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
                    <i class="bx bx-time text-gray-700 text-xl"></i>
                </div>
            </div>
            <div class="flex items-center gap-1 mt-4 text-gray-700 text-sm">
                <i class="bx bx-up-arrow-alt"></i>
                <span>2% increase</span>
            </div>
        </div>

    </div>

    <div class="w-full grid grid-cols-3 grid-rows-2 gap-4 min-h-96">

        <div class="bg-white shadow-sm col-span-2 p-4" use:chart={options}>
        </div>

        <div class="bg-white shadow-sm rounded-md row-span-2">
            <h1 class="m-4 text-xl font-medium">Activities</h1>
            <div class="flex flex-col mt-4">
                {#each tasks as task}
                    <div class="flex items-center gap-3 hover:bg-black/5 p-3 transition-colors">
                        <div class="flex items-center
                            {task.status === 'backlog' ? 'bg-red-100' : 
                            task.status === 'todo' ? 'bg-blue-100' : 
                            task.status === 'in-progress' ? 'bg-yellow-100' : 
                            'bg-green-100'} p-2 rounded-full">
                            <i class="bx 
                                {task.status === 'backlog' ? 'bx-error-circle text-gray-700' : 
                                task.status === 'todo' ? 'bx-list-ul text-blue-600' : 
                                task.status === 'in-progress' ? 'bx-loader text-yellow-600' : 
                                'bx-check-double text-green-600'}">
                            </i>
                        </div>
                        <div class="flex-1">
                            <div class="flex items-center gap-2">
                                <p class="text-sm">{task.title}</p>
                                <span class="{
                                    task.task_type === 'epic' ? 'bg-purple-100 text-purple-800' : 
                                    task.task_type === 'feature' ? 'bg-blue-100 text-blue-800' : 
                                    'bg-green-100 text-green-800'
                                } px-2 py-0.5 rounded-full text-xs">
                                    {ucfirst(task.task_type)}
                                </span>
                            </div>
                            <p class="text-sm text-gray-500">Project Title</p>
                            <span class="{task.status === 'backlog' ? 'bg-red-100' : 
                            task.status === 'todo' ? 'bg-blue-100' : 
                            task.status === 'in-progress' ? 'bg-yellow-100' : 
                            'bg-green-100'} px-2 py-0.5 rounded-full text-xs">
                                {ucfirst(task.status)}
                            </span>
                            <span class="text-xs text-gray-500">{task.createdAt}</span>
                        </div>
                    </div>
                {/each}
            </div>
        </div>

        <div class="bg-white rounded-md shadow-sm w-full col-span-2 p-4">
            <div class="w-full flex justify-between items-center">
                <h1 class="text-xl font-medium">Projects</h1>
                <div class="flex gap-4">
                    <div class="relative group/dropdown flex items-center">
                        <button class="h-full px-4 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 peer">
                            <i class="bx bx-sort-alt-2"></i>
                            <span class="text-sm text-gray-700">Name</span>
                        </button>
                        <div class="absolute left-0 top-12 bg-white shadow-lg rounded-lg p-2 w-48 border border-gray-100 hidden peer-focus:block group-hover/dropdown:block">
                            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                                <i class="bx bx-text"></i>
                                <span>Project Name</span>
                            </button>
                            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                                <i class="bx bx-dollar"></i>
                                <span>Estimated Income</span>
                            </button>
                            <button class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                                <i class="bx bx-calendar"></i>
                                <span>End Date</span>
                            </button>
                        </div>
                    </div>
                    <form class="focus-within:ring-1 focus-within:ring-primary flex items-center gap-3 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg">
                        <i class='bx bx-search text-gray-400'></i>
                        <input
                            placeholder="Search Projects"
                            id="search"
                            type="text"
                            name="search"
                            required
                            class="w-full text-gray-900"
                        />
                    </form>
                    <button class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                        <i class="bx bx-plus"></i>
                    </button>
                </div>
            </div>
            <div class="overflow-x-auto">
                <table class="w-full mt-4">
                    <thead class="bg-gray-50">
                        <tr>
                            <th class="px-4 py-3 text-left text-sm font-medium text-gray-500">Project</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500">Estimated Income</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500">End Date</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500">Progress</th>
                            <th class="px-4 py-3 text-right text-sm font-medium text-gray-500">Detail</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50 transition-colors cursor-pointer">
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <img src="https://assets.awwwards.com/awards/sites_of_the_day/2018/11/climate-1.jpg" alt="Climate" class="w-full h-full object-cover object-center rounded-sm aspect-square">
                                    </div>
                                    <div class="max-w-48">
                                        <h3 class="font-medium">Climate Website</h3>
                                        <p class="text-sm text-gray-500 truncate">Climate is a website that helps people learn about climate change.</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-green-600">$14,000</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">May 15, 2025</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">60%</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <a href="/projects/1" class="group py-2 flex justify-center items-center bg-primary text-white rounded-md">
                                    <i class="bx bx-right-arrow-alt group-hover:translate-x-2 transition-all duration-150"></i>
                                </a>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition-colors cursor-pointer">
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <img src="https://assets.digination.id/crop/0x0:0x0/x/photo/2018/10/10/97767959.jpg" alt="E-Commerce" class="w-full h-full object-cover object-center rounded-sm aspect-square">
                                    </div>
                                    <div class="max-w-48">
                                        <h3 class="font-medium">E-Commerce Website</h3>
                                        <p class="text-sm text-gray-500 truncate">E-Commerce website for a clothing store.</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-green-600">$20.000</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">May 17, 2025</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">30%</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <a href="/projects/1" class="group py-2 flex justify-center items-center bg-primary text-white rounded-md">
                                    <i class="bx bx-right-arrow-alt group-hover:translate-x-2 transition-all duration-150"></i>
                                </a>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition-colors cursor-pointer">
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <img src="https://scontent.fbdo9-1.fna.fbcdn.net/v/t39.30808-6/476229043_2717593245295298_9031680315377997174_n.jpg?stp=dst-jpg_s600x600_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGXXsC7Sj4caWwx6nMP67ASU63xcRLeUuFTrfFxEt5S4YevfNIW2jVFkOLi05FlG2jJ9-ttfDgpAuz3J69WODtq&_nc_ohc=o6KJ8i8F6YQQ7kNvwEUKprr&_nc_oc=Adn55hWu0_6G5KpqFSUbSCHC0jWijvEzl9R79hdI0d-RDmX-BD9Zz10tct1Xv_41FKc&_nc_zt=23&_nc_ht=scontent.fbdo9-1.fna&_nc_gid=AnG_0OsgYCfMbU8cGlaGPg&oh=00_AfJ6rg9mki9lfj-eLWI41LAXeOeyvz1ICgleqzs-Ux7cGA&oe=6828B13E" alt="Climate" class="w-full h-full object-cover object-center rounded-sm aspect-square">
                                    </div>
                                    <div class="max-w-48">
                                        <h3 class="font-medium">Fesnuk Clone App</h3>
                                        <p class="text-sm text-gray-500 truncate">Fesnuk is a clone of the popular social media platform, Facebook.</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-green-600">$4,000</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">May 18, 2025</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">20%</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <a href="/projects/1" class="group py-2 flex justify-center items-center bg-primary text-white rounded-md">
                                    <i class="bx bx-right-arrow-alt group-hover:translate-x-2 transition-all duration-150"></i>
                                </a>
                            </td>
                        </tr>
                        <tr class="hover:bg-gray-50 transition-colors cursor-pointer">
                            <td class="px-4 py-3">
                                <div class="flex items-center gap-4">
                                    <div class="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                                        <img src="https://scontent.fbdo9-1.fna.fbcdn.net/v/t39.30808-6/462230901_1611224983138804_3018528355987640461_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=2285d6&_nc_eui2=AeEv62esIp2BgyR57l9-CanNrwHhU6UT1AavAeFTpRPUBiQ6VU-bR6YbEAjkBr5OEXWE-M4fi0giE22dKitDS9YS&_nc_ohc=wfIypOP9a1UQ7kNvwGkEz1o&_nc_oc=AdnnH93aZZ3ju-EnkN1PlalczNRc9Z_Z3mQ0oE8D2n06co58-CbuFH3thQIu4Q4oONU&_nc_zt=23&_nc_ht=scontent.fbdo9-1.fna&_nc_gid=6LJd5qjBFMlhuP-2JMRmcg&oh=00_AfKDmGngSWxpuxaN_pcvgn1aenFq9evg4VNRX-9sW7lgaA&oe=6828D2C5" alt="Maksima" class="w-full h-full object-cover object-center rounded-sm aspect-square">
                                    </div>
                                    <div class="max-w-48">
                                        <h3 class="font-medium">Bebek Goreng H. Slamet</h3>
                                        <p class="text-sm text-gray-500 truncate">App for Bebek Goreng H. Slamet</p>
                                    </div>
                                </div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-green-600">$1.000</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">July 25, 2025</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <div class="text-sm font-medium text-gray-700">80%</div>
                            </td>
                            <td class="px-4 py-3 text-right">
                                <a href="/projects/1" class="group py-2 flex justify-center items-center bg-primary text-white rounded-md">
                                    <i class="bx bx-right-arrow-alt group-hover:translate-x-2 transition-all duration-150"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</div>
