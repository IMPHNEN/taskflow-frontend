import { ProjectService } from '../service';
import { projectStore, taskStore } from '../stores';
import type { ProjectCreate, ProjectUpdate, ProjectDetail } from '../types';
import { goto } from '$app/navigation';

/**
 * Load all projects for current user
 */
export async function loadProjects() {
  projectStore.setLoading(true);
  
  try {
    const projects = await ProjectService.listProjects();
    projectStore.setProjects(projects);
  } catch (error) {
    console.error('Error loading projects:', error);
    projectStore.setError('Failed to load projects');
  }
}

/**
 * Load a specific project with details
 */
export async function loadProject(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const project = await ProjectService.getProject(projectId);
    projectStore.setCurrentProject(project);
    return project;
  } catch (error) {
    console.error(`Error loading project ${projectId}:`, error);
    projectStore.setError('Failed to load project details');
    throw error;
  }
}

/**
 * Create a new project
 */
export async function createProject(project: ProjectCreate) {
  projectStore.setLoading(true);
  
  try {
    await ProjectService.createProject(project);
    await loadProjects(); // Reload projects list
    goto('/projects'); // Navigate to projects list
  } catch (error) {
    console.error('Error creating project:', error);
    projectStore.setError('Failed to create project');
    throw error;
  }
}

/**
 * Update an existing project
 */
export async function updateProject(projectId: string, projectUpdate: ProjectUpdate) {
  projectStore.setLoading(true);
  
  try {
    await ProjectService.updateProject(projectId, projectUpdate);
    
    // Check if we're updating the current project
    let storeState: { currentProject: ProjectDetail | null } = { currentProject: null };
    const unsubscribe = projectStore.subscribe(state => {
      storeState = state;
    });
    // Make sure to unsubscribe to avoid memory leaks
    unsubscribe();
    
    const currentProject = storeState.currentProject;
    
    if (currentProject && currentProject.id === projectId) {
      await loadProject(projectId);
    } else {
      // Otherwise just reload the projects list
      await loadProjects();
    }
  } catch (error) {
    console.error(`Error updating project ${projectId}:`, error);
    projectStore.setError('Failed to update project');
    throw error;
  }
}

/**
 * Delete a project
 */
export async function deleteProject(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    await ProjectService.deleteProject(projectId);
    projectStore.removeProject(projectId);
    goto('/projects'); // Navigate to projects list
  } catch (error) {
    console.error(`Error deleting project ${projectId}:`, error);
    projectStore.setError('Failed to delete project');
    throw error;
  }
}

/**
 * Generate BRD for project
 */
export async function generateBRD(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const response = await ProjectService.generateBRD(projectId);
    // Reload project to get updated BRD data
    await loadProject(projectId);
    return response;
  } catch (error) {
    console.error(`Error generating BRD for project ${projectId}:`, error);
    projectStore.setError('Failed to generate BRD');
    throw error;
  }
}

/**
 * Generate PRD for project
 */
export async function generatePRD(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const response = await ProjectService.generatePRD(projectId);
    // Reload project to get updated PRD data
    await loadProject(projectId);
    return response;
  } catch (error) {
    console.error(`Error generating PRD for project ${projectId}:`, error);
    projectStore.setError('Failed to generate PRD');
    throw error;
  }
}

/**
 * Generate project scope (tasks)
 */
export async function generateProjectScope(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const response = await ProjectService.generateProjectScope(projectId);
    // Reload project and tasks
    await loadProject(projectId);
    return response;
  } catch (error) {
    console.error(`Error generating tasks for project ${projectId}:`, error);
    projectStore.setError('Failed to generate project scope');
    throw error;
  }
}

/**
 * Validate market fit for project
 */
export async function validateMarketFit(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const response = await ProjectService.validateMarketFit(projectId);
    // Reload project to get updated market research data
    await loadProject(projectId);
    return response;
  } catch (error) {
    console.error(`Error validating market fit for project ${projectId}:`, error);
    projectStore.setError('Failed to validate market fit');
    throw error;
  }
}

/**
 * Setup GitHub repository for project
 */
export async function setupRepository(projectId: string) {
  projectStore.setLoading(true);
  
  try {
    const response = await ProjectService.setupProjectRepository(projectId);
    // Reload project to get updated GitHub setup data
    await loadProject(projectId);
    return response;
  } catch (error) {
    console.error(`Error setting up repository for project ${projectId}:`, error);
    projectStore.setError('Failed to setup GitHub repository');
    throw error;
  }
} 