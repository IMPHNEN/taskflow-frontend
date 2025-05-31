// User Types
export interface User {
  id: string;
  full_name?: string | null;
  avatar_url?: string | null;
}

export interface AuthSession {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user?: User;
}

// Project Types
export enum ProjectStatus {
  PLANNING = 'planning',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled'
}

export interface Project {
  id: string;
  name: string;
  objective: string;
  user_id: string;
  industry?: string | null;
  estimated_income?: number | null;
  estimated_outcome?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: ProjectStatus;
  created_at: string;
  updated_at: string;
}

export interface ProjectCreate {
  name: string;
  objective: string;
  industry?: string | null;
  estimated_income?: number | null;
  estimated_outcome?: number | null;
  start_date?: string | null;
  end_date?: string | null;
}

export interface ProjectUpdate {
  name?: string;
  objective?: string;
  industry?: string | null;
  estimated_income?: number | null;
  estimated_outcome?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  status?: ProjectStatus;
}

export interface BRD {
  id: string;
  project_id: string;
  brd_markdown: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface PRD {
  id: string;
  project_id: string;
  prd_markdown: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface MarketResearch {
  id: string;
  project_id: string;
  report_markdown: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface GitHubSetup {
  id: string;
  project_id: string;
  repository_url: string;
  repository_name: string;
  status: 'not_started' | 'in_progress' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
}

export interface ProjectDetail extends Project {
  brd: BRD | null;
  prd: PRD | null;
  market_research: MarketResearch | null;
  github_setup: GitHubSetup | null;
  tasks_generated: Task[];
  tasks_generation_status: 'not_started' | 'in_progress' | 'completed' | 'failed';
}

// Task Types
export enum TaskStatus {
  BACKLOG = 'backlog',
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed'
}

export interface Task {
  id: string;
  project_id: string;
  title: string;
  description: string;
  status: TaskStatus;
  position: number;
  created_at: string;
  updated_at: string;
  project_name?: string;
}

export interface TaskCreate {
  title: string;
  description: string;
  status?: TaskStatus;
  position: number;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  position?: number;
}

export interface TaskReorder {
  task_id: string;
  position: number;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message?: string;
  status?: string;
  error?: string;
} 