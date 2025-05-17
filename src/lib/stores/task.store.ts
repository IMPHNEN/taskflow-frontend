import { writable } from 'svelte/store';
import type { Task, TaskStatus } from '../types';

export interface TaskState {
  tasks: Task[];
  currentTask: Task | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  currentTask: null,
  isLoading: false,
  error: null
};

function createTaskStore() {
  const { subscribe, set, update } = writable<TaskState>(initialState);

  return {
    subscribe,
    
    // Set tasks list
    setTasks: (tasks: Task[]) => update(state => ({
      ...state,
      tasks,
      isLoading: false,
      error: null
    })),
    
    // Set current task
    setCurrentTask: (task: Task) => update(state => ({
      ...state,
      currentTask: task,
      isLoading: false,
      error: null
    })),
    
    // Add task to list
    addTask: (task: Task) => update(state => ({
      ...state,
      tasks: [...state.tasks, task],
      isLoading: false,
      error: null
    })),
    
    // Update task in list
    updateTask: (updatedTask: Task) => update(state => ({
      ...state,
      tasks: state.tasks.map(t => 
        t.id === updatedTask.id ? updatedTask : t
      ),
      currentTask: state.currentTask?.id === updatedTask.id ? updatedTask : state.currentTask,
      isLoading: false,
      error: null
    })),
    
    // Update task status
    updateTaskStatus: (taskId: string, status: TaskStatus) => update(state => ({
      ...state,
      tasks: state.tasks.map(t => 
        t.id === taskId ? { ...t, status } : t
      ),
      currentTask: state.currentTask?.id === taskId 
        ? { ...state.currentTask, status } 
        : state.currentTask,
      isLoading: false,
      error: null
    })),
    
    // Remove task from list
    removeTask: (taskId: string) => update(state => ({
      ...state,
      tasks: state.tasks.filter(t => t.id !== taskId),
      currentTask: state.currentTask?.id === taskId ? null : state.currentTask,
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
    
    // Reset tasks for new project
    resetTasks: () => update(state => ({
      ...state,
      tasks: [],
      currentTask: null,
      isLoading: false,
      error: null
    }))
  };
}

export const taskStore = createTaskStore(); 