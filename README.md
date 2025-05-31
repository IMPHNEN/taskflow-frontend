# TaskFlow Frontend

A modern, AI-powered project management platform designed specifically for solo entrepreneurs. TaskFlow combines intelligent automation with intuitive design to help you plan, track, and execute projects efficiently with data-driven insights.

## 🎯 Project Purpose

TaskFlow empowers solo entrepreneurs by providing:

- **AI-driven project scoping** - Generate comprehensive project requirements and task breakdowns
- **Intelligent automation** - Automate repetitive workflows and repository setup
- **Visual project management** - Kanban boards with drag-and-drop functionality
- **Market validation tools** - AI-powered market research and fit validation
- **Advanced analytics** - Real-time insights into productivity and project performance

## 🤖 AI Features Overview

TaskFlow leverages OpenAI's powerful language models in several key areas:

### Document Generation

- **BRD (Business Requirements Document)** - AI analyzes project ideas to generate comprehensive business requirements with structured markdown output
- **PRD (Product Requirements Document)** - Converts business requirements into detailed product specifications
- **Project Scope & Tasks** - Automatically breaks down projects into actionable tasks with timelines and priorities

### Market Intelligence

- **Market Fit Validation** - AI-powered market analysis to validate project viability and competitive positioning
- **Competitive Analysis** - Research and analyze market positioning with mermaid diagram visualizations

### Automation

- **Repository Setup** - Automated GitHub repository creation with best practices and CI/CD pipeline configuration
- **Workflow Automation** - Smart task management and notification systems

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- GitHub account (for repository integration)
- Backend API service running (TaskFlow API)

## ⚙️ Configuration

Create a `.env.local` file in the root directory:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api
VITE_API_TIMEOUT=10000

# GitHub Integration (if using GitHub OAuth)
VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=http://localhost:8000/auth/callback/github

# Environment
VITE_NODE_ENV=development
```

## 🚀 Installation & Development

### Quick Start

```bash
# Clone the repository
git clone https://github.com/IMPHNEN/taskflow-frontend
cd taskflow-frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Access the application
open http://localhost:8000
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server on port 8000
npm run build        # Build for production
npm run preview      # Preview production build locally

# Code Quality
npm run check        # Run Svelte check for type errors
npm run check:watch  # Run Svelte check in watch mode
npm run prepare      # Prepare SvelteKit sync
```

## 📁 Detailed Folder Structure

```
taskflow-frontend/
├── src/
│   ├── lib/                    # Shared library code
│   │   ├── actions/           # Business logic functions
│   │   │   ├── auth.actions.ts       # Authentication operations
│   │   │   ├── project.actions.ts    # Project management operations
│   │   │   ├── task.actions.ts       # Task management operations
│   │   │   ├── dashboard.actions.ts  # Dashboard data processing
│   │   │   └── index.ts              # Action exports
│   │   ├── components/        # Reusable UI components
│   │   │   └── Project/              # Project-specific components
│   │   │       ├── Card.svelte       # Project card display
│   │   │       ├── Create.svelte     # Project creation modal
│   │   │       ├── Brd.svelte        # BRD modal component
│   │   │       ├── Prd.svelte        # PRD modal component
│   │   │       ├── Market.svelte     # Market research display with mermaid
│   │   │       └── Kanban/           # Kanban board components
│   │   │           ├── Item.svelte   # Kanban task item
│   │   │           └── Modal.svelte  # Task modal
│   │   ├── service/           # API communication layer
│   │   │   ├── api.ts                # Base API client with auth
│   │   │   ├── auth.service.ts       # Authentication API calls
│   │   │   ├── project.service.ts    # Project API operations
│   │   │   ├── task.service.ts       # Task API operations
│   │   │   ├── user.service.ts       # User API operations
│   │   │   └── index.ts              # Service exports
│   │   ├── stores/            # Svelte state management
│   │   │   ├── auth.store.ts         # Authentication state
│   │   │   ├── project.store.ts      # Project state
│   │   │   ├── task.store.ts         # Task state
│   │   │   └── index.ts              # Store exports
│   │   ├── types/             # TypeScript type definitions
│   │   │   └── index.ts              # All type definitions
│   │   ├── utils/             # Utility functions
│   │   │   └── transform.ts          # Data transformation utilities
│   │   └── index.ts           # Library exports
│   ├── routes/                # SvelteKit routes (pages)
│   │   ├── +layout.svelte            # Root layout component
│   │   ├── +layout.ts               # Layout data loading & auth check
│   │   ├── +page.svelte             # Landing page
│   │   ├── auth/                    # Authentication pages
│   │   │   └── callback/            # OAuth callbacks
│   │   │       └── github/          # GitHub OAuth callback
│   │   ├── dashboard/               # Dashboard page
│   │   │   ├── +page.js             # Disable SSR
│   │   │   └── +page.svelte         # Dashboard with charts
│   │   ├── login/                   # Login page
│   │   ├── register/                # Registration page
│   │   └── projects/                # Project pages
│   │       ├── +page.svelte         # Projects list
│   │       └── [id]/                # Dynamic project detail page
│   │           └── +page.svelte     # Project detail with Kanban
│   ├── app.html              # HTML template
│   ├── app.css               # Global styles
│   └── app.d.ts              # App-wide type declarations
├── static/                   # Static assets
│   └── favicon.png
├── package.json             # Dependencies and scripts
├── svelte.config.js         # SvelteKit configuration
├── vite.config.ts           # Vite build configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```

### Key Architecture Components

#### Actions Layer (`src/lib/actions/`)

Business logic functions that coordinate between UI components and services:

- Handle loading states and error management
- Update application stores based on API responses
- Provide clean interfaces for components to trigger operations

Key functions:

- `loadProjects()` - Fetch all user projects
- `generateProjectScope()` - AI-powered task generation
- `setupRepository()` - Automated GitHub repo creation
- `validateMarketFit()` - Market research generation

#### Services Layer (`src/lib/service/`)

API communication layer with typed interfaces:

- `TaskService` - Task CRUD operations and status management
- `ProjectService` - Project management and AI document generation
- `AuthService` - Authentication and user management
- Base API client with authentication interceptors

#### Stores (`src/lib/stores/`)

Reactive state management using Svelte stores:

- Centralized application state with TypeScript
- Loading and error state handling
- Real-time updates across components

#### Types (`src/lib/types/`)

Comprehensive TypeScript definitions:

- Project, Task, and User interfaces
- API response types
- Status enums (ProjectStatus, TaskStatus)
- Document types (BRD, PRD, MarketResearch)

## 🎮 Usage Examples

### AI Project Scope Generation

```typescript
import { generateProjectScope } from "$lib/actions";

// Generate tasks automatically from project requirements
async function generateTasks(projectId: string) {
  try {
    await generateProjectScope(projectId);
    // Tasks will be automatically loaded and displayed in Kanban board
  } catch (error) {
    console.error("Failed to generate project scope:", error);
  }
}
```

### Task Management with Drag & Drop

```typescript
import { loadTasks, createTask, updateTask } from "$lib/actions";
import { TaskStatus } from "$lib/types";

// Load tasks for a project
await loadTasks(projectId);

// Create a new task
await createTask(projectId, {
  title: "Implement user authentication",
  description: "Add login and registration functionality",
  status: TaskStatus.TODO,
  position: 0,
});

// Update task status (used by Sortable.js)
await updateTask(projectId, taskId, {
  status: TaskStatus.IN_PROGRESS,
});
```

### Document Generation (BRD/PRD)

```typescript
import { generateBRD, generatePRD } from "$lib/actions";

// Generate Business Requirements Document
async function createBRD(projectId: string) {
  try {
    await generateBRD(projectId);
    // BRD will be available in project store with markdown content
  } catch (error) {
    console.error("BRD generation failed:", error);
  }
}

// Generate Product Requirements Document
async function createPRD(projectId: string) {
  try {
    await generatePRD(projectId);
    // PRD will be rendered with markdown-it
  } catch (error) {
    console.error("PRD generation failed:", error);
  }
}
```

### Repository Automation

```typescript
import { setupRepository } from "$lib/actions";

// Automatically setup GitHub repository
async function initializeRepo(projectId: string) {
  try {
    const result = await setupRepository(projectId);
    console.log("Repository created:", result.data.repository_url);
  } catch (error) {
    console.error("Repository setup failed:", error);
  }
}
```

### Market Validation

```typescript
import { validateMarketFit } from "$lib/actions";

// Generate AI-powered market research with mermaid diagrams
async function analyzeMarket(projectId: string) {
  try {
    await validateMarketFit(projectId);
    // Market research data will be available in project store
    // Rendered with mermaid diagram support
  } catch (error) {
    console.error("Market validation failed:", error);
  }
}
```

## 📊 Dashboard Analytics

The dashboard provides real-time insights using `processTasksForChart`:

- **Task Completion Trends** - ApexCharts area charts showing productivity over time
- **Project Status Overview** - Quick glance at all project statuses with counts
- **Overdue Project Detection** - Automatic identification of delayed projects
- **Recent Activity Feed** - Latest tasks and project updates with timestamps

Features:

- Interactive charts with date-based filtering
- Real-time data updates via Svelte stores
- Responsive design for mobile and desktop

## 🛠️ Technology Stack

### Frontend Framework

- **SvelteKit 2.16.0** - Full-stack web framework with SSR/SPA capabilities
- **Svelte 5.0** - Modern reactive framework with runes
- **TypeScript 5.0** - Type safety and enhanced development experience
- **Vite 6.2.6** - Fast build tool and development server

### UI & Styling

- **Tailwind CSS 4.0** - Utility-first CSS framework
- **Boxicons** - Icon library for consistent UI elements

### Data Visualization

- **ApexCharts 4.7.0** - Interactive charts for dashboard analytics
- **Mermaid 11.6.0** - Diagram rendering for market research

### Form Handling

- **Felte 1.3.0** - Form library for Svelte
- **Yup 1.6.1** - Schema validation

### Content Processing

- **markdown-it 14.1.0** - Markdown parsing for AI-generated documents
- **date-fns 4.1.0** - Date manipulation and formatting

### Drag & Drop

- **SortableJS 1.15.6** - Drag and drop functionality for Kanban boards

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect Repository**

   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy
   vercel --prod
   ```

2. **Environment Variables**
   Set the following in Vercel dashboard:

   ```
   VITE_API_URL=https://your-api-domain.com/api
   VITE_GITHUB_CLIENT_ID=your_production_github_client_id
   VITE_GITHUB_REDIRECT_URI=https://your-domain.com/auth/callback/github
   VITE_NODE_ENV=production
   ```

3. **Build Configuration**
   Vercel automatically detects SvelteKit and uses `@sveltejs/adapter-auto`.

### Alternative Deployment Options

#### Netlify

```bash
# Build command
npm run build

# Publish directory
build
```

#### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 8000
CMD ["node", "build"]
```

### Build Configuration

The project uses:

- **SvelteKit adapter-auto** for automatic platform detection
- **Vite with TailwindCSS plugin** for optimized builds
- **TypeScript strict mode** for type safety

## 🛠️ Development Guidelines

### Code Organization

- **Components** should be pure UI with minimal business logic
- **Actions** handle all business operations and state updates
- **Services** only contain API communication logic
- **Stores** manage reactive state with proper typing

### API Integration Pattern

All API calls flow through the services layer:

1. Component calls action function
2. Action calls service method
3. Service makes HTTP request via `apiClient`
4. Action updates store with response
5. Component reactively updates via store subscription

### State Management Pattern

```typescript
// Subscribe to stores in components
$: projects = $projectStore.projects;
$: loading = $projectStore.isLoading;
$: error = $projectStore.error;

// Update stores in actions
projectStore.setLoading(true);
const projects = await ProjectService.listProjects();
projectStore.setProjects(projects);
```

### Authentication Flow

- Layout checks authentication on protected routes
- Auth tokens stored in localStorage
- Automatic token refresh on API calls
- GitHub OAuth integration for repository access

## 🔧 Key Features Implementation

### Kanban Board with SortableJS

- Drag and drop between columns (Backlog → Todo → In Progress → Completed)
- Real-time position updates via API
- Optimistic UI updates with error handling
- Status mapping between frontend and backend

### AI Document Generation

- Markdown rendering with `markdown-it`
- Mermaid diagram support for market research
- Real-time generation status tracking
- Responsive modal displays

### Real-time Dashboard

- ApexCharts integration for task completion trends
- Automatic data processing and chart updates
- Overdue project detection algorithm
- Recent activity timeline

## 🔗 Related Links

- [SvelteKit Documentation](https://kit.svelte.dev/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [ApexCharts Documentation](https://apexcharts.com/docs)
- [Mermaid Documentation](https://mermaid.js.org)
- [TypeScript in Svelte](https://svelte.dev/docs#component-format-script-lang-ts)

## 📄 License
