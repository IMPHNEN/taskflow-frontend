// Export auth actions
export * from './auth.actions';

// Export project actions
export * from './project.actions';

// Export task actions
export * from './task.actions';

// Export dashboard actions
export * from './dashboard.actions';

// Alias for better naming
export { loadProjects as fetchProjects } from './project.actions';
export { deleteProject } from './project.actions'; 