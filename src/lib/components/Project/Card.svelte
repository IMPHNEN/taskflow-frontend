<div class="flex flex-col gap-4 p-4 rounded-xl border-gray-100 border hover:border-primary shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-white">
    <div class="flex justify-between">
        <div class="flex flex-col gap-2">
            <h1>E-Commerce Website</h1>
            <div class="flex items-center gap-1 text-xs text-gray-500">
                <i class="bx bx-time"></i>
                <span>2 weeks ago</span>
            </div>
        </div>
        <button class="">
            <i class="bx bx-dots-horizontal-rounded text-xl"></i>
        </button>
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
            A modern e-commerce platform with seamless user experience, secure payment processing, and robust product management capabilities.
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
    <a href="/projects/1" class="bg-primary mt-4 rounded-lg text-white text-center py-3 w-full hover:bg-darker transition-all duration-300 font-medium hover:shadow-md">
        View Details
    </a>
</div>