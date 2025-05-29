<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import Sortable from 'sortablejs';
    import { format } from 'date-fns';


    import Item from "$lib/components/Project/Kanban/Item.svelte";
    import Modal from "$lib/components/Project/Kanban/Modal.svelte";
    import Market from "$lib/components/Project/Market.svelte";
    import { generateProjectScope, loadProject, setupRepository, validateMarketFit } from "$lib/actions";
    import type { ProjectDetail } from "$lib/types";
    import { projectStore } from "$lib/stores";
    
    const markdown = `
# Market Validation Report: Project Management Tools

_Date: May 17, 2025_

---

## Executive Summary

This report validates the market opportunity for a new project management (PM) tool by analyzing competitors, identifying unique selling points (USPs), projecting market growth, and estimating revenue streams and initial costs.

**Key Findings:**

- Current leading competitors include ClickUp, Asana, Trello, Jira, and Monday.com, with broad features but notable gaps in advanced analytics, niche industry customization, and AI integration.
- Market trends show growing demand for remote collaboration tools, AI enhancements, and customizable automation.
- Our proposed PM tool should emphasize AI-driven personalization, advanced analytics, and niche industry focus supported by flexible, usage-based pricing.
- Market size is expanding steadily, with an expected CAGR of ~15% over the next 5 years.
- Multiple revenue streams are viable, including subscriptions, enterprise licensing, and marketplace fees.
- Initial MVP development requires a moderately sized team and 3-4 months, with estimated costs roughly $60k-$80k.

**Recommendations:**

- Differentiate by embedding advanced AI and analytics tools alongside deep niche-specific customizations.
- Adopt flexible, usage-based pricing to appeal to startups and SMBs.
- Focus marketing on enhanced remote collaboration and automation to leverage market trends.

---

## 1. Competitor Analysis

### Overview of Top Competitors

| Competitor     | Key Features                                                                                                                      | Pricing Plans (per user/month)                           | Strengths                                                | Weaknesses                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------------- | -------------------------------------------------- |
| **ClickUp**    | Project management, task tracking, time tracking, team collaboration, reports, extensive integrations, automation & customization | Free, Starter $5, Business $9, Enterprise custom         | Wide feature set; free tier; scalable; strong automation | Pricey for small teams; learning curve; complexity |
| **Asana**      | Task & project tracking, timelines, dashboards, automation, collaboration tools                                                   | Free, Premium $10.99, Business $24.99, Enterprise custom | Strong collaboration focus; clean UI                     | Limited advanced analytics; pricey tiers           |
| **Trello**     | Kanban boards, checklists, labels, power-ups, collaboration                                                                       | Free, Business $12.50, Enterprise custom                 | Intuitive visual management; easy to use                 | Limited in-depth reporting; lacks niche features   |
| **Jira**       | Agile project management, customizable workflows, reporting                                                                       | Free, Standard $7.75, Premium $15.25, Enterprise custom  | Robust agile tools; customizable; strong reporting       | Complex UI; steep learning curve                   |
| **Monday.com** | Project tracking, automation, dashboards, integrations, collaboration                                                             | Basic $8, Standard $10, Pro $16, Enterprise custom       | Flexible; good for all team sizes; visual tools          | Expensive; limited free plan                       |

### Competitor Comparison Table

| Feature                      | ClickUp | Asana   | Trello    | Jira     | Monday.com |
| ---------------------------- | ------- | ------- | --------- | -------- | ---------- |
| Task Management              | ✔       | ✔       | ✔         | ✔        | ✔          |
| Time Tracking                | ✔       | Limited | No        | Limited  | ✔          |
| Advanced Analytics           | Basic   | Limited | No        | Advanced | Basic      |
| Automation                   | ✔       | ✔       | Power-ups | ✔        | ✔          |
| AI Integration               | No      | No      | No        | No       | No         |
| Niche Industry Customization | Limited | No      | No        | Custom   | Limited    |
| Collaboration Tools          | ✔       | ✔       | ✔         | ✔        | ✔          |
| Pricing Flexibility          | Tiered  | Tiered  | Tiered    | Tiered   | Tiered     |
| Free Plan Availability       | Yes     | Yes     | Yes       | Yes      | Limited    |

---

### Competitor Mindshare Visualization

\`\`\`mermaid
pie
    title Competitor Mindshare
    "ClickUp": 29
    "Asana": 24
    "Trello": 18
    "Jira": 16
    "Monday.com": 13
\`\`\`

---

## 2. Recommended Unique Selling Points (USPs)

Based on market gaps and competitor limitations, we recommend the following USPs:

- **Niche Industry Customization:** Tailored workflows and templates designed specifically for industries like healthcare, construction, and education.
- **Enhanced User Analytics:** AI-driven dashboards delivering deep insights on team productivity, project risks, and resource optimization.
- **AI-Driven Personalization:** Intelligent task prioritization, automated scheduling, and predictive project outcome analysis.
- **Flexible Pricing Models:** Usage-based pricing allowing startups and smaller teams to scale cost-effectively.
- **Integrated Remote Collaboration:** Advanced real-time communication tools embedded within the platform to support hybrid/remote teams.

---

### USP Relationships Visualization

\`\`\`mermaid
graph LR
    A[Niche Industry Customization] --> B[Increased Adoption]
    C[Enhanced User Analytics] --> D[Improved User Experience]
    E[AI-Driven Personalization] --> F[Enhanced User Engagement]
    G[Flexible Pricing Models] --> H[Broader Market Reach]
\`\`\`

---

## 3. Future Market Projection

Industry research indicates a strong growth trajectory driven by digital transformation and remote work demand.

| Year | Estimated Market Size (Billion USD) |
| ---- | ----------------------------------- |
| 2025 | 2.5                                 |
| 2026 | 2.9                                 |
| 2027 | 3.3                                 |
| 2028 | 3.8                                 |
| 2029 | 4.4                                 |
| 2030 | 5.0                                 |

---

### Market Size Projection Chart

\`\`\`mermaid
xychart-beta
    title "Market Size Projection"
    x-axis "Year" [2025, 2026, 2027, 2028, 2029, 2030]
    y-axis "Market Size (Billion USD)" 0 --> 5.5
    line [2.5, 2.875, 3.3, 3.8, 4.4, 5.0]
\`\`\`

---

## 4. Revenue Streams and Potential Earnings

### Potential Revenue Streams

- **Subscriptions:** Monthly/Annual user subscriptions with tiered or usage-based pricing.
- **Marketplace Fees:** Commissions on third-party app/extension sales within our platform.
- **Enterprise Licensing:** Custom contracts for large organizations requiring advanced features and support.
- **Professional Services:** Consulting, onboarding, and training services.
- **Advertisements:** Limited, contextual promotions for complementary tools.

### Estimated Revenue Distribution (Year 1–3)

\`\`\`mermaid
pie
title Revenue Streams
"Subscriptions": 50
"Enterprise Licensing": 25
"Marketplace Fees": 15
"Professional Services": 7
"Advertisements": 3
\`\`\`

---

## 5. Initial Cost Estimate for MVP Development

Key cost components include human resources, tools, and time:

| Cost Category    | Details                          | Estimated Cost |
| ---------------- | -------------------------------- | -------------- |
| Human Resources  | Developers (3) - $25k each       | $75,000        |
|                  | UI/UX Designers (1)              | $15,000        |
|                  | QA Engineer (1)                  | $10,000        |
| Tools & Software | Cloud Infrastructure (3 months)  | $5,000         |
|                  | Licensing/Third-Party APIs       | $4,000         |
| Time Allocation  | Development Timeline: 3-4 months | Included in HR |
| Miscellaneous    | Marketing Pre-launch, Legal      | $3,000         |

---

### Cost Breakdown Flowchart

\`\`\`mermaid
flowchart TD
A[Project Cost Estimate] --> B[Human Resources]
A --> C[Tools & Software]
A --> D[Time Allocation]
A --> E[Miscellaneous Expenses]
B --> B1[Developers - $75k]
B --> B2[Designers - $15k]
B --> B3[QA Engineer - $10k]
C --> C1[Cloud Services - $5k]
C --> C2[APIs/Tools - $4k]
D --> D1[3-4 Months Timeline]
E --> E1[Marketing & Legal - $3k]
\`\`\`

---

## Conclusion

The project management software market is vibrant and growing, but existing competitors leave significant gaps in AI-driven analytics, niche customization, and flexible pricing. Our proposed solution can leverage these gaps by focusing on AI integrations, industry-specific workflows, and subscription flexibility, backed by a reasonable MVP development budget.

Targeting these areas promises competitive differentiation, strong user adoption, and diversified revenue opportunities in a flourishing marketplace.

---

# End of Report

    `

    const tasks = [
        {
            title: "Setup Payment Gateway",
            description: "Integrate Stripe payment system for secure transactions",
            task_type: "epic",
            status: "backlog",
            position: 1,
            createdAt: "Added 2 days ago"
        },
        {
            title: "Implement Cart System",
            description: "Create shopping cart functionality with real-time updates", 
            task_type: "feature",
            status: "backlog",
            position: 2,
            createdAt: "Added 3 days ago"
        },
        {
            title: "Design Product Page",
            description: "Create responsive layout for product details",
            task_type: "feature", 
            status: "todo",
            position: 3,
            createdAt: "Added 1 day ago"
        },
        {
            title: "Setup Product Filters",
            description: "Implement category and price range filters",
            task_type: "task",
            status: "todo", 
            position: 4,
            createdAt: "Added 1 day ago"
        },
        {
            title: "User Authentication",
            description: "Implement login and registration system",
            task_type: "epic",
            status: "in-progress",
            position: 5,
            createdAt: "Started 3 days ago"
        },
        {
            title: "Social Login Integration", 
            description: "Add Google and Facebook login options",
            task_type: "feature",
            status: "in-progress",
            position: 6,
            createdAt: "Started 1 day ago"
        },
        {
            title: "Project Setup",
            description: "Initialize project and configure development environment",
            task_type: "task",
            status: "done",
            position: 7,
            createdAt: "Completed 1 week ago"
        },
        {
            title: "Database Schema Design",
            description: "Create initial database structure and relationships",
            task_type: "feature",
            status: "done",
            position: 8,
            createdAt: "Completed 5 days ago"
        }
    ];

    let showModal = $state(false);

    let project: ProjectDetail | null = null;
    let loading = true;
    let error = '';

    // Subscribe to the project store
    const unsubscribe = projectStore.subscribe(state => {
        project = state.currentProject;
        loading = state.isLoading;
        error = state.error || '';
    });

    onMount(() => {
        (async () => {
            try {
                // Fetch projects and tasks in parallel
                await Promise.all([
                    loadProject($page.params.id),
                ]);
            } catch (err) {
                console.error('Failed to fetch dashboard data:', err);
            }
        })();
    
        const backlog = document.getElementById('backlog');
        const todo = document.getElementById('todo');
        const inProgress = document.getElementById('in-progress');
        const done = document.getElementById('done');

        new Sortable(backlog!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(todo!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(inProgress!, {
            group: 'shared',
            animation: 300
        });

        new Sortable(done!, {
            group: 'shared',
            animation: 300
        });

        return unsubscribe;
    });

    function formatDate(dateString: string | null | undefined) {
        if (!dateString) return '';
        return format(new Date(dateString), 'MMM dd, yyyy');
    }
</script>

<svelte:head>
    <title>E-Commerce Website</title>
</svelte:head>

<div class="flex flex-col gap-4">
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-info-circle text-xl text-primary"></i>
                <h2 class="font-medium">Project Details</h2>
            </div>
            <div class="flex gap-2">
                <button class="bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                    Edit Project
                </button>
                <button class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-all flex items-center gap-2 ml-2">
                    <i class="bx bxl-github"></i>
                    Setup Project Repository
                </button>
            </div>
        </div>
    
        <div class="grid grid-cols-2 gap-6 text-sm">
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Project Name</span>
                <p class="font-medium">{project?.name}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Objective</span>
                <p>{project?.objective}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Outcome</span>
                <p class="font-medium text-red-600">${project?.estimated_outcome}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Estimated Income</span>
                <p class="font-medium text-green-600">${project?.estimated_income}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">Start Date</span>
                <p>{formatDate(project?.start_date)}</p>
            </div>
            <div class="flex flex-col gap-2">
                <span class="text-gray-500">End Date</span>
                <p>{formatDate(project?.end_date)}</p>
            </div>
            {#if project?.github_setup}
                <div class="flex flex-col gap-2 col-span-2">
                    <span class="text-gray-500">Github Repository</span>
                    <a href={project?.github_setup?.repository_url} class="text-primary hover:text-secondary">{project?.github_setup?.repository_url}</a>
                </div>
            {/if}
        </div>
    </div>
    
    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow relative z-0">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-desktop text-xl text-primary"></i>
                <h2 class="font-medium">Mockup Project</h2>
            </div>
            <button disabled class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                Gave Some Preview
            </button>
        </div>
   
        <h3 class="text-3xl text-center">Incoming...</h3>
    </div>
    
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-semibold text-gray-800">Kanban Board</h1>
            <p class="text-gray-500">Manage your project tasks and progress</p>
        </div>
        <button class="disabled:opacity-50 disabled:cursor-auto bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
            Generate Tasks
        </button>
    </div>
    
    <div class="grid grid-cols-4 gap-6">
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-error-circle text-red-500 text-xl"></i>
                    <h2 class="font-medium">Backlog</h2>
                </div>
                <span class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">3</span>
            </div>
            
            <div id="backlog" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter(task => task.status === 'backlog') as task}
                    <Item {...task} handleContextMenu={() => showModal = true} />
                {/each}
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-list-ul text-blue-500 text-xl"></i>
                    <h2 class="font-medium">Todo</h2>
                </div>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">5</span>
            </div>
    
            <div id="todo" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter(task => task.status === 'todo') as task}
                    <Item {...task} handleContextMenu={() => showModal = true} />
                {/each}
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-loader text-yellow-500 text-xl"></i>
                    <h2 class="font-medium">In Progress</h2>
                </div>
                <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">2</span>
            </div>
    
            <div id="in-progress" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter(task => task.status === 'in-progress') as task}
                    <Item {...task} handleContextMenu={() => showModal = true} />
                {/each}
            </div>
        </div>
    
        <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                <div class="flex items-center gap-2">
                    <i class="bx bx-check-double text-green-500 text-xl"></i>
                    <h2 class="font-medium">Done</h2>
                </div>
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">8</span>
            </div>
            <div id="done" class="flex flex-col gap-3 min-h-96">
                {#each tasks.filter(task => task.status === 'done') as task}
                    <Item {...task} handleContextMenu={() => showModal = true} />
                {/each}
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-4 bg-white p-4 rounded-lg shadow">
        <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
                <i class="bx bx-search text-xl text-primary"></i>
                <h2 class="font-medium">Market Research</h2>
            </div>
            <button class="disabled:opacity-50 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-all">
                Generate Market Research
            </button>
        </div>

        <Market {markdown} />
    
    </div>
</div>

{#if showModal}
    <Modal close={() => showModal = false} />
{/if}