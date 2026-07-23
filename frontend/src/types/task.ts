export type Priority = "LOW" | "MEDIUM" | "HIGH";

export type Status = "PENDING" | "IN_PROGRESS" | "COMPLETED";

export type SortBy = "newest" | "oldest" | "dueDate";

export interface Task {
  id: string;
  title: string;
  description: string | null;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TasksResponse {
  tasks: Task[];
}

export interface TaskResponse {
  message: string;
  task: Task;
}

export interface DashboardStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export interface TaskFilters {
  search?: string;
  status?: Status | "";
  priority?: Priority | "";
  sortBy?: SortBy;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: Status;
  dueDate?: string;
}
