<script lang="ts">
    import { onMount } from "svelte";
    import markdownIt from "markdown-it";
    import { generateBRD } from "$lib/actions";
    import type { BRD } from "$lib/types";

    const { brd, close, id } : {
        brd: BRD | null | undefined;
        close: () => void;
        id: string;
    } = $props();

    let htmlContent = $state('');

    onMount(async () => {
        const md = markdownIt({ html: true });
        let rendered = md.render(brd?.brd_markdown || '');
        htmlContent = rendered;
    });
</script>

<div 
    role="dialog" 
    aria-labelledby="prd-title"
    class="fixed top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center z-50"
>
    <div 
        role="presentation"
        class="relative flex flex-col gap-4 bg-white p-0 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        style="box-shadow:0 4px 32px 0 rgba(44,62,80,0.10);"
    >
        <!-- Decorative Top Bar -->
         <div class="bg-white sticky top-0 z-10">
             <div class="flex items-center justify-between px-6 py-3 rounded-t-2xl border-b border-gray-100 bg-gradient-to-r from-primary/10 to-white">
                <div class="flex items-center gap-2">
                    <span class="bg-primary/20 p-2 rounded-lg flex items-center justify-center">
                        <i class="bx bx-file text-2xl text-primary"></i>
                    </span>
                    <h2 id="prd-title" class="font-semibold text-lg text-gray-800">Business Requirements Document</h2>
                </div>
                <button 
                    on:click={() => close()} 
                    aria-label="Close dialog" 
                    class="flex items-center p-2 rounded-full hover:bg-primary/10 transition"
                    >
                    <i class="bx bx-x text-2xl text-gray-500"></i>
                </button>
            </div>
        </div>

        <!-- Cute Divider -->
        <div class="flex items-center gap-2 px-6 pt-2">
            <span class="w-2 h-2 rounded-full bg-primary inline-block"></span>
            <span class="w-2 h-2 rounded-full bg-secondary inline-block"></span>
            <span class="w-2 h-2 rounded-full bg-gray-200 inline-block"></span>
        </div>

        <!-- Content -->
        {#if brd?.status === 'not_started'}
            <div class="px-6 pb-6 pt-2 flex flex-col justify-center items-center">
                <h2 class="text-lg font-semibold text-gray-800">BRD hasn't been started yet</h2>
                <button on:click={() => generateBRD(id)} class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                    Generate BRD
                </button>
            </div>
        {:else if brd?.status === 'in_progress'}
            <div class="px-6 pb-6 pt-2 flex flex-col justify-center items-center">
                <h2 class="text-lg font-semibold text-gray-800">BRD is in progress</h2>
                {#if brd?.brd_markdown}
                    <div class="markdown prose prose-sm max-w-none w-full">
                        {@html htmlContent}
                    </div>
                {/if}
            </div>
        {:else if brd?.status === 'completed'}
            <div class="px-6 pb-6 pt-2">
                {#if brd?.brd_markdown}
                    <div class="markdown prose prose-sm max-w-none">
                        {@html htmlContent}
                    </div>
                {:else}
                    <div class="flex flex-col justify-center items-center">
                        <h2 class="text-lg font-semibold text-gray-800">BRD is completed but has no content</h2>
                    </div>
                {/if}
            </div>
        {:else if brd?.status === 'failed'}
            <div class="px-6 pb-6 pt-2 flex flex-col justify-center items-center">
                <h2 class="text-lg font-semibold text-gray-800">Failed to generate BRD</h2>
                <button on:click={() => generateBRD(id)} class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                    Try Again
                </button>
            </div>
        {:else}
            <div class="px-6 pb-6 pt-2 flex flex-col justify-center items-center">
                <h2 class="text-lg font-semibold text-gray-800">No BRD available</h2>
                <button on:click={() => generateBRD(id)} class="bg-primary w-max text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                    Generate BRD
                </button>
            </div>
        {/if}
    </div>
</div>