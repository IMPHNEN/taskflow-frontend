# Types

This directory contains TypeScript type definitions used throughout the application.

## Purpose

- Define the shape of data used across the application
- Ensure type safety and consistency
- Document the data structures

## Structure

- `index.ts` - Exports all type definitions
  
## Types Overview

- User and authentication related types
- Project related types
- Task related types
- API response types

## Usage

Import types from this directory when defining variables, parameters, return types, etc:

```typescript
import type { User, Project, Task } from '$lib/types';
```
