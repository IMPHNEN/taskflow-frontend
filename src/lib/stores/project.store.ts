import { writable } from 'svelte/store';
import type { Project, ProjectDetail } from '../types';

export interface ProjectState {
  projects: Project[];
  currentProject: ProjectDetail | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProjectState = {
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null
};

function createProjectStore() {
  const { subscribe, set, update } = writable<ProjectState>(initialState);

  return {
    subscribe,
    
    // Set projects list
    setProjects: (projects: Project[]) => update(state => ({
      ...state,
      projects,
      isLoading: false,
      error: null
    })),
    
    // Set current project
    setCurrentProject: (project: ProjectDetail) => update(state => ({
      ...state,
      currentProject: project,
      isLoading: false,
      error: null
    })),
    
    // Add project to list
    addProject: (project: Project) => update(state => ({
      ...state,
      projects: [...state.projects, project],
      isLoading: false,
      error: null
    })),
    
    // Update project in list
    updateProject: (updatedProject: Project) => update(state => ({
      ...state,
      projects: state.projects.map(p => 
        p.id === updatedProject.id ? updatedProject : p
      ),
      currentProject: state.currentProject?.id === updatedProject.id 
        ? { ...state.currentProject, ...updatedProject } 
        : state.currentProject,
      isLoading: false,
      error: null
    })),
    
    // Remove project from list
    removeProject: (projectId: string) => update(state => ({
      ...state,
      projects: state.projects.filter(p => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject,
      isLoading: false,
      error: null
    })),
    
    // Set loading state
    setLoading: (isLoading: boolean) => update(state => ({
      ...state,
      isLoading
    })),
    
    // Set error state
    setError: (error: string) => update(state => ({
      ...state,
      isLoading: false,
      error
    })),
    
    // Reset store
    reset: () => set(initialState)
  };
}

export const projectStore = createProjectStore(); 