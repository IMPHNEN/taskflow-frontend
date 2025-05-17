import { TaskService } from '../service';
import { taskStore } from '../stores';
import type { TaskCreate, TaskUpdate, TaskReorder, TaskStatus } from '../types';

/**
 * Load all tasks for a project
 */
export async function loadTasks(projectId: string, status?: TaskStatus) {
  taskStore.setLoading(true);
  
  try {
    const tasks = await TaskService.listTasks(projectId, status);
    taskStore.setTasks(tasks);
    return tasks;
  } catch (error) {
    console.error(`Error loading tasks for project ${projectId}:`, error);
    taskStore.setError('Failed to load tasks');
    throw error;
  }
}

/**
 * Load a specific task
 */
export async function loadTask(projectId: string, taskId: string) {
  taskStore.setLoading(true);
  
  try {
    const task = await TaskService.getTask(projectId, taskId);
    taskStore.setCurrentTask(task);
    return task;
  } catch (error) {
    console.error(`Error loading task ${taskId}:`, error);
    taskStore.setError('Failed to load task details');
    throw error;
  }
}

/**
 * Create a new task
 */
export async function createTask(projectId: string, task: TaskCreate) {
  taskStore.setLoading(true);
  
  try {
    await TaskService.createTask(projectId, task);
    await loadTasks(projectId); // Reload tasks list
  } catch (error) {
    console.error('Error creating task:', error);
    taskStore.setError('Failed to create task');
    throw error;
  }
}

/**
 * Update an existing task
 */
export async function updateTask(projectId: string, taskId: string, taskUpdate: TaskUpdate) {
  taskStore.setLoading(true);
  
  try {
    await TaskService.updateTask(projectId, taskId, taskUpdate);
    await loadTasks(projectId); // Reload tasks list
  } catch (error) {
    console.error(`Error updating task ${taskId}:`, error);
    taskStore.setError('Failed to update task');
    throw error;
  }
}

/**
 * Update a task's status
 */
export async function updateTaskStatus(projectId: string, taskId: string, status: TaskStatus) {
  try {
    // Optimistically update the task status in the store
    taskStore.updateTaskStatus(taskId, status);
    
    // Then update on the server
    await TaskService.updateTask(projectId, taskId, { status });
  } catch (error) {
    console.error(`Error updating task ${taskId} status:`, error);
    taskStore.setError('Failed to update task status');
    // Reload tasks to reset to server state
    await loadTasks(projectId);
    throw error;
  }
}

/**
 * Delete a task
 */
export async function deleteTask(projectId: string, taskId: string) {
  taskStore.setLoading(true);
  
  try {
    await TaskService.deleteTask(projectId, taskId);
    taskStore.removeTask(taskId);
  } catch (error) {
    console.error(`Error deleting task ${taskId}:`, error);
    taskStore.setError('Failed to delete task');
    throw error;
  }
}

/**
 * Reorder tasks in a project
 */
export async function reorderTasks(projectId: string, taskOrders: TaskReorder[]) {
  try {
    await TaskService.reorderTasks(projectId, taskOrders);
    await loadTasks(projectId); // Reload tasks with new order
  } catch (error) {
    console.error('Error reordering tasks:', error);
    taskStore.setError('Failed to reorder tasks');
    throw error;
  }
} 