import apiClient from './api';
import type { 
  Project, 
  ProjectCreate, 
  ProjectUpdate,
  ProjectDetail,
  ApiResponse,
  Task,
  MarketResearch,
  GitHubSetup
} from '../types';

/**
 * ProjectService handles all project related API calls
 */
export const ProjectService = {
  /**
   * Create a new project
   */
  createProject: async (project: ProjectCreate): Promise<void> => {
    await apiClient.post('/user/project', project);
  },

  /**
   * List all projects for current user
   */
  listProjects: async (): Promise<Project[]> => {
    const response = await apiClient.get<Project[]>('/user/project');
    return response.data;
  },

  /**
   * Get a specific project with details
   */
  getProject: async (projectId: string): Promise<ProjectDetail> => {
    const response = await apiClient.get<ProjectDetail>(`/user/project/${projectId}`);
    return response.data;
  },

  /**
   * Update a project
   */
  updateProject: async (projectId: string, projectUpdate: ProjectUpdate): Promise<void> => {
    await apiClient.patch(`/user/project/${projectId}`, projectUpdate);
  },

  /**
   * Delete a project
   */
  deleteProject: async (projectId: string): Promise<void> => {
    await apiClient.delete(`/user/project/${projectId}`);
  },

  /**
   * Generate BRD for project
   */
  generateBRD: async (projectId: string): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(`/user/project/${projectId}/generate-brd`, {});
    return response.data;
  },

  /**
   * Generate PRD for project
   */
  generatePRD: async (projectId: string): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(`/user/project/${projectId}/generate-prd`, {});
    return response.data;
  },

  /**
   * Generate project scope (tasks)
   */
  generateProjectScope: async (projectId: string): Promise<ApiResponse<Task[]>> => {
    const response = await apiClient.post<ApiResponse<Task[]>>(`/user/project/${projectId}/generate-scope`, {});
    return response.data;
  },

  /**
   * Validate market fit for project
   */
  validateMarketFit: async (projectId: string): Promise<ApiResponse<MarketResearch>> => {
    const response = await apiClient.post<ApiResponse<MarketResearch>>(`/user/project/${projectId}/validate-market`, {});
    return response.data;
  },

  /**
   * Setup GitHub repository for project
   */
  setupProjectRepository: async (projectId: string): Promise<ApiResponse<GitHubSetup>> => {
    const response = await apiClient.post<ApiResponse<GitHubSetup>>(`/user/project/${projectId}/setup-repository`, {});
    return response.data;
  },

  /**
   * Generate project preview
   */
  generateProjectPreview: async (projectId: string): Promise<ApiResponse<string>> => {
    const response = await apiClient.post<ApiResponse<string>>(`/user/project/${projectId}/generate-preview`, {});
    return response.data;
  }
}; 