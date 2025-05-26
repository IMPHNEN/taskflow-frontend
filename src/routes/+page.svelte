<script>
    import { fade } from 'svelte/transition';
    let navOpen = false;
    function toggleNav() {
        navOpen = !navOpen;
    }
</script>
<div class="font-inter">

    <header class="sticky top-0 left-0 bg-white shadow-xs z-50">
        <nav class="flex justify-between items-center p-4">
            <a href="/" class="text-2xl font-bold">
                <p class="font-bold text-primary">TaskFlow</p>
            </a>
            <!-- Desktop Nav -->
            <ul class="max-md:hidden flex gap-8 text-gray-600 font-medium">
                <li><a href="#whytaskflow">Why TaskFlow</a></li>
                <li><a href="#howitworks">How It Works</a></li>
            </ul>
            <!-- Mobile Hamburger -->
            <button class="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100 transition" on:click={toggleNav} aria-label="Open navigation">
                <span class="block w-6 h-0.5 bg-gray-700 mb-1 transition-all" style="transform: {navOpen ? 'rotate(45deg) translateY(7px)' : 'none'}"></span>
                <span class="block w-6 h-0.5 bg-gray-700 mb-1 transition-all" style="opacity: {navOpen ? 0 : 1}"></span>
                <span class="block w-6 h-0.5 bg-gray-700 transition-all" style="transform: {navOpen ? 'rotate(-45deg) translateY(-7px)' : 'none'}"></span>
            </button>
            <div class="flex gap-8 items-center font-medium text-sm max-md:hidden">
                <a href="/register" class="text-gray-600">
                    Sign In
                </a>
                <a href="/register" class="bg-primary text-white px-6 py-3 rounded-md">
                    Get Started Free
                </a>
            </div>
        </nav>
        <!-- Mobile Dropdown Nav -->
        {#if navOpen}
            <div class="md:hidden px-4 pb-4" transition:fade={{ duration: 150 }}>
                <ul class="flex flex-col gap-2 text-gray-700 font-medium bg-white rounded-lg shadow-lg p-4 border border-gray-100">
                    <li><a href="#whytaskflow" class="block py-2 px-2 rounded hover:bg-gray-50 transition" on:click={toggleNav}>Why TaskFlow</a></li>
                    <li><a href="#howitworks" class="block py-2 px-2 rounded hover:bg-gray-50 transition" on:click={toggleNav}>How It Works</a></li>
                    <li class="border-t border-gray-100 mt-2 pt-2 flex flex-col gap-2">
                        <a href="/register" class="block py-2 px-2 rounded text-gray-600 hover:bg-gray-50 transition">Sign In</a>
                        <a href="/register" class="bg-primary text-white px-4 py-2 rounded-md font-semibold shadow hover:bg-secondary transition w-full">
                            Get Started Free
                        </a>
                    </li>
                </ul>
            </div>
        {/if}
    </header>


    <div class="flex flex-col md:flex-row items-center justify-between py-16 px-6 md:px-20 bg-gradient-to-br from-green-50 via-white to-green-50">
        <div class="flex-1 max-w-xl">
            <div class="mb-4 text-[#29AB59] bg-primary/10 px-4 py-2 flex items-center gap-2 w-max rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                <span class="font-medium">AI-Powered Project Management</span>
            </div>
            <h1 class="text-4xl md:text-5xl font-black leading-tight mb-4 text-[#111827]">
                Empower Your <span class="text-primary">Solo Journey</span>
            </h1>
            <p class="text-gray-600 text-lg mb-8">
                Streamlined project management tool tailored for solo-preneurs. Plan, track, and execute projects efficiently with intelligent, data-driven insights.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="/register" class="bg-primary text-white px-6 py-3 rounded-md font-semibold shadow hover:bg-secondary transition">
                    Start Your Free Trial
                    <span class="ml-2">→</span>
                </a>
                <a href="#" class="flex items-center justify-center px-6 py-3 border border-gray-200 rounded-md text-primary font-semibold bg-white hover:bg-gray-50 transition">
                    Watch Demo
                    <i class='bx bx-play text-2xl'></i>
                </a>
            </div>
            <div class="flex gap-8 text-gray-700 text-sm font-medium">
                <div>
                    <span class="text-xl font-bold block">10k+</span>
                    Active Users
                </div>
                <div>
                    <span class="text-xl font-bold block">95%</span>
                    Success Rate
                </div>
                <div>
                    <span class="text-xl font-bold block">24/7</span>
                    AI Support
                </div>
            </div>
        </div>

        <div class="flex-1 flex justify-center mt-12 md:mt-0 shadow-lg rounded-2xl">
            <div class="bg-white rounded-2xl shadow-lg p-6 w-full border border-gray-100" style="box-shadow:0 2px 16px 0 rgba(44,62,80,0.06);">
                <div class="flex items-center justify-between mb-6">
                    <h2 class="font-semibold text-gray-800 text-lg">Project Dashboard</h2>
                    <div class="flex gap-1">
                        <span class="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
                        <span class="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span>
                        <span class="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                    </div>
                </div>
                <div class="flex gap-4 mb-4">
                    <div class="flex-1 flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                        <span class="bg-primary rounded-lg p-2 flex items-center justify-center shadow" style="box-shadow:0 1px 4px 0 rgba(44,62,80,0.06);">
                            <i class='bx bx-bullseye text-2xl text-white'></i>
                        </span>
                        <div>
                            <div class="text-xs text-gray-500 font-medium">Active Projects</div>
                            <div class="text-2xl font-bold text-primary leading-tight">12</div>
                        </div>
                    </div>
                    <div class="flex-1 flex items-center gap-3 bg-green-50 rounded-xl px-4 py-3">
                        <span class="bg-primary rounded-lg p-2 flex items-center justify-center shadow" style="box-shadow:0 1px 4px 0 rgba(44,62,80,0.06);">
                            <i class='bx bxs-bolt text-2xl text-white'></i>
                        </span>
                        <div>
                            <div class="text-xs text-gray-500 font-medium">Completed</div>
                            <div class="text-2xl font-bold text-primary leading-tight">89</div>
                        </div>
                    </div>
                </div>
                <div class="mb-4">
                    <div class="flex justify-between mb-1">
                        <span class="text-xs text-gray-500">Weekly Progress</span>
                        <span class="text-xs text-primary font-semibold">78%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                        <div class="bg-primary h-2 rounded-full transition-all duration-500" style="width: 78%"></div>
                    </div>
                </div>
                <div class="relative bg-blue-50 rounded-xl p-4 overflow-hidden flex items-start gap-3 border border-blue-100">
                    <div class="absolute top-0 -left-1 w-2 h-full bg-[#64A7FA]"></div>
                    <div class="flex items-start gap-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64A7FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mt-1.5 lucide lucide-sparkles w-4 h-4"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                        <div>
                            <span class="text-sm text-gray-700 font-semibold">AI Insight</span>
                            <p class="text-xs text-gray-500 mt-1">You're 23% ahead of schedule! Consider taking on a new project.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="whytaskflow" class="p-4 my-16">
        <div class="flex flex-col items-center text-center mb-8">
            <span class="inline-block bg-green-100 text-green-600 font-medium px-3 py-1 rounded-full mb-4">
                <i class='bx bxs-bolt align-middle mr-1'></i>
                Powerful Features
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold leading-tight mb-2 text-[#111827]">
                Everything you need to <br><span class="text-primary">succeed solo</span>
            </h2>
            <p class="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                TaskFlow combines intelligent automation with intuitive design to give solo entrepreneurs the power of an entire project management team.
            </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <!-- Card 1: AI Project Scope Generation -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-green-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-brain text-2xl text-green-500'></i>
                </span>
                <div class="font-semibold text-green-600">AI Project Scope Generation</div>
                <div class="text-xs text-gray-500">
                    Let AI analyze your ideas and generate comprehensive project scopes with timelines, milestones, and resource requirements.
                </div>
            </div>
            <!-- Card 2: Automated Repository Setup -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-green-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-git-repo-forked text-2xl text-teal-500'></i>
                </span>
                <div class="font-semibold text-teal-600">Automated Repository Setup</div>
                <div class="text-xs text-gray-500">
                    Instantly create and configure development repositories with best practices, templates, and CI/CD pipelines.
                </div>
            </div>
            <!-- Card 3: Visual Project Previews -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-blue-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-show-alt text-2xl text-blue-500'></i>
                </span>
                <div class="font-semibold text-blue-600">Visual Project Previews</div>
                <div class="text-xs text-gray-500">
                    Get instant visual mockups and previews of your projects before you start development, saving time and resources.
                </div>
            </div>
            <!-- Card 4: Market Fit Validation -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-green-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-bar-chart-alt-2 text-2xl text-green-500'></i>
                </span>
                <div class="font-semibold text-green-600">Market Fit Validation</div>
                <div class="text-xs text-gray-500">
                    AI-powered market analysis and validation tools to ensure your projects have the best chance of success.
                </div>
            </div>
            <!-- Card 5: Advanced Analytics -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-teal-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-line-chart text-2xl text-teal-500'></i>
                </span>
                <div class="font-semibold text-teal-600">Advanced Analytics</div>
                <div class="text-xs text-gray-500">
                    Deep insights into your project performance, productivity patterns, and success metrics with beautiful dashboards.
                </div>
            </div>
            <!-- Card 6: Smart Automation -->
            <div class="bg-white rounded-xl shadow p-6 border border-gray-100 flex flex-col gap-2 hover:shadow-lg hover:-translate-y-2 transition">
                <span class="bg-blue-100 p-2 rounded-lg w-fit mb-2">
                    <i class='bx bx-cog text-2xl text-blue-500'></i>
                </span>
                <div class="font-semibold text-blue-600">Smart Automation</div>
                <div class="text-xs text-gray-500">
                    Automate repetitive tasks, notifications, and workflows to focus on what matters most - building your vision.
                </div>
            </div>
        </div>
    </div>

    <div id="howitworks" class="p-4 my-16">
        <div class="flex flex-col items-center text-center mb-8">
            <span class="bg-green-100 text-green-600 flex items-center font-medium gap-2 px-3 py-1 rounded-full mb-4">
                <i class='bx bx-bullseye'></i>
                Visual Project Management
            </span>
            <h2 class="text-3xl md:text-5xl font-extrabold leading-tight mb-2 text-[#111827]">
                See your progress <br><span class="text-primary">at glance</span>
            </h2>
            <p class="text-gray-500 max-w-xl mx-auto text-sm md:text-base">
                Organize your projects with our intuitive Kanban boards. Track progress, manage deadlines, and stay focused on what matters most.
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <!-- To Do Column -->
            <div class="bg-gray-50 rounded-xl border border-gray-200 p-4 flex flex-col min-h-[350px]">
                <div class="flex items-center justify-between mb-4">
                    <span class="font-semibold text-gray-700">To Do</span>
                    <span class="bg-gray-200 text-xs px-2 py-0.5 rounded">3</span>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <!-- Task 1 -->
                    <div class="bg-white rounded-lg p-3 shadow border border-gray-100 flex flex-col gap-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer transition">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">Design landing page mockups</span>
                            <span class="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded">High</span>
                        </div>
                        <div class="text-xs text-gray-500">Create wireframes and high-fidelity designs</div>
                        <div class="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                            <span>Mar 19</span>
                            <span>•</span>
                            <span><i class='bx bx-message'></i> 3</span>
                            <span><i class='bx bx-user'></i> 2</span>
                        </div>
                    </div>
                    <!-- Task 2 -->
                    <div class="bg-white rounded-lg p-3 shadow border border-gray-100 flex flex-col gap-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer transition">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">Research competitor pricing</span>
                            <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <div class="text-xs text-gray-500">Analyze market pricing strategies</div>
                        <div class="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                            <span>Mar 20</span>
                            <span>•</span>
                            <span><i class='bx bx-message'></i> 1</span>
                            <span><i class='bx bx-user'></i> 1</span>
                        </div>
                    </div>
                </div>
                <button class="mt-3 text-xs text-gray-400 hover:text-primary transition flex items-center gap-1">
                    <i class='bx bx-plus'></i> Add task
                </button>
            </div>
            <!-- In Progress Column -->
            <div class="bg-green-50 rounded-xl border border-green-100 p-4 flex flex-col min-h-[350px]">
                <div class="flex items-center justify-between mb-4">
                    <span class="font-semibold text-green-700">In Progress</span>
                    <span class="bg-green-200 text-xs px-2 py-0.5 rounded">1</span>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <!-- Task 1 -->
                    <div class="bg-white rounded-lg p-3 shadow border border-gray-100 flex flex-col gap-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer transition">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">Implement user authentication</span>
                            <span class="bg-red-100 text-red-500 text-xs px-2 py-0.5 rounded">High</span>
                        </div>
                        <div class="text-xs text-gray-500">Set up OAuth and session management</div>
                        <div class="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                            <span>Mar 20</span>
                            <span>•</span>
                            <span><i class='bx bx-message'></i> 2</span>
                            <span><i class='bx bx-user'></i> 1</span>
                        </div>
                    </div>
                </div>
                <button class="mt-3 text-xs text-gray-400 hover:text-primary transition flex items-center gap-1">
                    <i class='bx bx-plus'></i> Add task
                </button>
            </div>
            <!-- Review Column -->
            <div class="bg-teal-50 rounded-xl border border-teal-100 p-4 flex flex-col min-h-[350px]">
                <div class="flex items-center justify-between mb-4">
                    <span class="font-semibold text-teal-700">Review</span>
                    <span class="bg-teal-200 text-xs px-2 py-0.5 rounded">1</span>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <!-- Task 1 -->
                    <div class="bg-white rounded-lg p-3 shadow border border-gray-100 flex flex-col gap-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer transition">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800">API documentation</span>
                            <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <div class="text-xs text-gray-500">Complete technical documentation</div>
                        <div class="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                            <span>Mar 21</span>
                            <span>•</span>
                            <span><i class='bx bx-message'></i> 0</span>
                            <span><i class='bx bx-user'></i> 1</span>
                        </div>
                    </div>
                </div>
                <button class="mt-3 text-xs text-gray-400 hover:text-primary transition flex items-center gap-1">
                    <i class='bx bx-plus'></i> Add task
                </button>
            </div>
            <!-- Done Column -->
            <div class="bg-teal-50 rounded-xl border border-teal-100 p-4 flex flex-col min-h-[350px]">
                <div class="flex items-center justify-between mb-4">
                    <span class="font-semibold text-teal-700">Done</span>
                    <span class="bg-teal-200 text-xs px-2 py-0.5 rounded">1</span>
                </div>
                <div class="flex flex-col gap-3 flex-1">
                    <!-- Task 1 -->
                    <div class="bg-white rounded-lg p-3 shadow border border-gray-100 flex flex-col gap-1 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/35 cursor-pointer transition">
                        <div class="flex items-center justify-between">
                            <span class="font-medium text-gray-800 line-through">Auth Page</span>
                            <span class="bg-yellow-100 text-yellow-600 text-xs px-2 py-0.5 rounded">Medium</span>
                        </div>
                        <div class="text-xs text-gray-500">Complete technical documentation</div>
                        <div class="flex items-center gap-3 mt-2 text-[10px] text-gray-400">
                            <span>Mar 20</span>
                            <span>•</span>
                            <span><i class='bx bx-message'></i> 0</span>
                            <span><i class='bx bx-user'></i> 1</span>
                        </div>
                    </div>
                </div>
                <button class="mt-3 text-xs text-gray-400 hover:text-primary transition flex items-center gap-1">
                    <i class='bx bx-plus'></i> Add task
                </button>
            </div>
        </div>
    </div>

    <div class=" flex flex-col items-center justify-center bg-gradient-to-br from-primary to-[#0F9984] py-16 px-4 text-center shadow-lg">
        <div class="mb-3">
            <span class="flex items-center gap-1 bg-[#53D485] text-white text-xs px-4 py-2 rounded-full font-medium tracking-wide shadow-sm backdrop-blur-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-sparkles w-4 h-4 mr-2"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path><path d="M20 3v4"></path><path d="M22 5h-4"></path><path d="M4 17v2"></path><path d="M5 18H3"></path></svg>
                Ready to Transform Your Workflow?
            </span>
        </div>
        <h1 class="text-3xl md:text-5xl max-w-xl font-extrabold text-white mb-2 leading-tight">
            Join thousands of solo entrepreneurs
            building better projects
        </h1>
        <p class="text-white/80 text-base md:text-lg mb-6 max-w-xl mx-auto">
            Stop juggling multiple tools and start focusing on what you do best.<br>
            TaskFlow brings everything together in one intelligent platform.
        </p>
        <div class="flex flex-wrap justify-center gap-4 mb-7 text-white/90 text-sm">
            <div class="flex items-center gap-2">
                <i class='bx bx-check-circle text-green-200'></i>
                Start with 14-day free trial
            </div>
            <div class="flex items-center gap-2">
                <i class='bx bx-credit-card-front text-green-200'></i>
                No credit card required
            </div>
            <div class="flex items-center gap-2">
                <i class='bx bx-refresh text-green-200'></i>
                Cancel anytime
            </div>
            <div class="flex items-center gap-2">
                <i class='bx bx-lock-open text-green-200'></i>
                Full feature access
            </div>
        </div>
        <button class="bg-white text-green-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-green-50 transition w-full sm:w-auto">
            Start Your Free Trial
        </button>
    </div>

    <footer class="bg-[#181F2A] text-gray-300 pt-12 pb-6 px-4 md:px-16 mt-0">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
            <!-- Brand & Description -->
            <div class="flex-1 min-w-[220px] mb-8 md:mb-0">
                <div class="flex items-center gap-3 mb-3">
                    <span class="bg-green-500 text-white font-bold rounded-full w-9 h-9 flex items-center justify-center text-xl">T</span>
                    <span class="text-xl font-bold text-white">TaskFlow</span>
                </div>
                <p class="text-gray-400 text-sm mb-4 max-w-xs">
                    Empowering solo entrepreneurs with intelligent project management tools. Build better, move faster, and achieve more with TaskFlow.
                </p>
                <div class="flex gap-3 mt-2">
                    <a href="#" class="hover:text-primary transition"><i class='bx bxl-twitter text-xl'></i></a>
                    <a href="#" class="hover:text-primary transition"><i class='bx bxl-facebook text-xl'></i></a>
                    <a href="#" class="hover:text-primary transition"><i class='bx bxl-linkedin text-xl'></i></a>
                    <a href="#" class="hover:text-primary transition"><i class='bx bxl-instagram text-xl'></i></a>
                </div>
            </div>
            <!-- Links -->
            <div class="flex flex-[2] flex-wrap gap-10 md:gap-20">
                <div>
                    <div class="font-semibold text-white mb-3">Product</div>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-primary transition">Features</a></li>
                        <li><a href="#" class="hover:text-primary transition">Pricing</a></li>
                        <li><a href="#" class="hover:text-primary transition">Integrations</a></li>
                        <li><a href="#" class="hover:text-primary transition">API</a></li>
                        <li><a href="#" class="hover:text-primary transition">Changelog</a></li>
                    </ul>
                </div>
                <div>
                    <div class="font-semibold text-white mb-3">Company</div>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-primary transition">About</a></li>
                        <li><a href="#" class="hover:text-primary transition">Blog</a></li>
                        <li><a href="#" class="hover:text-primary transition">Careers</a></li>
                        <li><a href="#" class="hover:text-primary transition">Contact</a></li>
                        <li><a href="#" class="hover:text-primary transition">Press</a></li>
                    </ul>
                </div>
                <div>
                    <div class="font-semibold text-white mb-3">Resources</div>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-primary transition">Documentation</a></li>
                        <li><a href="#" class="hover:text-primary transition">Help Center</a></li>
                        <li><a href="#" class="hover:text-primary transition">Community</a></li>
                        <li><a href="#" class="hover:text-primary transition">Templates</a></li>
                        <li><a href="#" class="hover:text-primary transition">Tutorials</a></li>
                    </ul>
                </div>
                <div>
                    <div class="font-semibold text-white mb-3">Legal</div>
                    <ul class="space-y-2 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-primary transition">Privacy Policy</a></li>
                        <li><a href="#" class="hover:text-primary transition">Terms of Service</a></li>
                        <li><a href="#" class="hover:text-primary transition">Cookie Policy</a></li>
                        <li><a href="#" class="hover:text-primary transition">GDPR</a></li>
                    </ul>
                </div>
            </div>
         </div>
    </footer>
</div>