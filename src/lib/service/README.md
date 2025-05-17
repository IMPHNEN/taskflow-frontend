# Services

This directory contains API services that communicate with the backend.

## Purpose

- Handle HTTP requests to the backend API
- Manage API responses and errors
- Centralize API communication logic

## Structure

- `api.ts` - Base API client configuration with auth interceptors
- `auth.service.ts` - Authentication API calls
- `user.service.ts` - User information API calls
- `project.service.ts` - Project management API calls
- `task.service.ts` - Task management API calls
- `index.ts` - Exports all services

## Usage

Services should be used by the actions layer, not directly by components:

```typescript
import { AuthService, ProjectService } from '$lib/service';
```

Each service provides methods that correspond to API endpoints.
