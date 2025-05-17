import apiClient from './api';
import type { 
  Task, 
  TaskCreate, 
  TaskUpdate,
  TaskReorder,
  TaskStatus
} from '../types';

/**
 * TaskService handles all task related API calls
 */
export const TaskService = {
  /**
   * Create a new task in a project
   */
  createTask: async (projectId: string, task: TaskCreate): Promise<void> => {
    await apiClient.post(`/user/task/${projectId}`, task);
  },

  /**
   * List all tasks in a project
   */
  listTasks: async (projectId: string, status?: TaskStatus): Promise<Task[]> => {
    const params = status ? { status } : undefined;
    const response = await apiClient.get<Task[]>(`/user/task/${projectId}`, { params });
    return response.data;
  },

  /**
   * Get a specific task
   */
  getTask: async (projectId: string, taskId: string): Promise<Task> => {
    const response = await apiClient.get<Task>(`/user/task/${projectId}/${taskId}`);
    return response.data;
  },

  /**
   * Update a task
   */
  updateTask: async (projectId: string, taskId: string, taskUpdate: TaskUpdate): Promise<void> => {
    await apiClient.patch(`/user/task/${projectId}/${taskId}`, taskUpdate);
  },

  /**
   * Delete a task
   */
  deleteTask: async (projectId: string, taskId: string): Promise<void> => {
    await apiClient.delete(`/user/task/${projectId}/${taskId}`);
  },

  /**
   * Reorder tasks in a project
   */
  reorderTasks: async (projectId: string, taskOrders: TaskReorder[]): Promise<void> => {
    await apiClient.patch(`/user/task/${projectId}/reorder`, taskOrders);
  }
}; 