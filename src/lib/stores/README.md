# Stores

This directory contains Svelte stores for state management.

## Purpose

- Maintain application state
- Provide reactive state updates to components
- Centralize state logic
- Enable components to subscribe to state changes

## Structure

- `auth.store.ts` - Authentication state management
- `project.store.ts` - Project state management
- `task.store.ts` - Task state management
- `index.ts` - Exports all stores

## Usage

Stores can be used directly in components:

```typescript
import { authStore, projectStore, taskStore } from '$lib/stores';

// In a Svelte component
$: isAuthenticated = $authStore.isAuthenticated;
$: currentProject = $projectStore.currentProject;
$: tasks = $taskStore.tasks;
```

Or they can be updated by actions:

```typescript
// In an action
import { projectStore } from '$lib/stores';

projectStore.setLoading(true);
// ... perform some operation
projectStore.setProjects(projects);
```

Each store provides:
- A `subscribe` method for Svelte reactivity
- Setter methods to update state
- Loading and error handling
