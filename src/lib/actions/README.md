# Actions

This directory contains business logic functions that components can use.

## Purpose

- Implement business logic that uses services to communicate with the backend
- Update application state (stores) based on API responses
- Handle errors and provide feedback
- Separate UI components from backend communication details

## Structure

- `auth.actions.ts` - Authentication related actions
- `project.actions.ts` - Project management actions
- `task.actions.ts` - Task management actions
- `index.ts` - Exports all actions

## Usage

Actions should be used by UI components:

```typescript
import { loadProjects, createProject } from '$lib/actions';

// In a component or page
onMount(async () => {
  await loadProjects();
});

async function handleSubmit() {
  try {
    await createProject(newProject);
    // Handle success
  } catch (error) {
    // Handle error
  }
}
```

Actions typically:
1. Update loading state in a store
2. Call one or more service methods
3. Update store with results or errors
4. Handle navigation if needed
