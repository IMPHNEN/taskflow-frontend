import { ProjectService, TaskService } from '../service';
import { taskStore } from '../stores';
import type { Project, Task } from '../types';
import { ProjectStatus, TaskStatus } from '../types';

/**
 * Load tasks across all projects
 */
export async function loadAllTasks() {
  taskStore.setLoading(true);
  
  try {
    // First get all projects
    const projects = await ProjectService.listProjects();
    
    // Then get tasks for each project
    let allTasks: Task[] = [];
    for (const project of projects) {
      const projectTasks = await TaskService.listTasks(project.id);
      // Add project name to tasks for display in the dashboard
      const tasksWithProject = projectTasks.map(task => ({
        ...task,
        project_name: project.name
      }));
      allTasks = [...allTasks, ...tasksWithProject];
    }
    
    // Sort by created_at/updated_at date
    allTasks.sort((a, b) => 
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
    
    // Store in taskStore but with a limited number for the dashboard
    taskStore.setTasks(allTasks.slice(0, 8));
    
    return allTasks;
  } catch (error) {
    console.error('Error loading all tasks:', error);
    taskStore.setError('Failed to load tasks');
    throw error;
  } finally {
    taskStore.setLoading(false);
  }
}

/**
 * Process tasks into chart data for the dashboard
 */
export function processTasksForChart(tasks: Task[]) {
  // Group tasks by date (last 10 days)
  const dates = getLast10Days();
  const tasksByDate: Record<string, { total: number, completed: number }> = {};
  
  // Initialize all dates with zero counts
  dates.forEach(date => {
    tasksByDate[date] = { total: 0, completed: 0 };
  });
  
  // Count tasks by creation date
  tasks.forEach(task => {
    const dateKey = new Date(task.created_at).toISOString().split('T')[0];
    if (tasksByDate[dateKey]) {
      tasksByDate[dateKey].total++;
      if (task.status === TaskStatus.COMPLETED) {
        tasksByDate[dateKey].completed++;
      }
    }
  });
  
  // Format for ApexCharts
  const categories = dates;
  const taskCounts = categories.map(date => tasksByDate[date]?.total || 0);
  const completedCounts = categories.map(date => tasksByDate[date]?.completed || 0);
  
  return {
    categories: categories.map(date => date + 'T00:00:00.000Z'),
    series: [
      { name: 'Tasks', data: taskCounts },
      { name: 'Completed', data: completedCounts }
    ]
  };
}

/**
 * Calculate overdue projects
 */
export function calculateOverdueProjects(projects: Project[]) {
  const currentDate = new Date();
  return projects.filter(project => {
    if (!project.end_date) return false;
    const endDate = new Date(project.end_date);
    return endDate < currentDate && project.status !== ProjectStatus.COMPLETED;
  }).length;
}

/**
 * Get the last 10 days as ISO date strings
 */
function getLast10Days() {
  const dates: string[] = [];
  const today = new Date();
  
  for (let i = 9; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
} 