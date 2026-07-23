import api from "@/lib/axios";
import type {
  Task,
  TasksResponse,
  TaskResponse,
  DashboardStats,
  TaskFilters,
  CreateTaskRequest,
  UpdateTaskRequest,
} from "@/types/task";

export const TaskService = {
  async getTasks(filters?: TaskFilters): Promise<Task[]> {
    const params: Record<string, string> = {};
    if (filters?.search) params.search = filters.search;
    if (filters?.status) params.status = filters.status;
    if (filters?.priority) params.priority = filters.priority;
    if (filters?.sortBy) params.sortBy = filters.sortBy;

    const response = await api.get<TasksResponse>("/tasks", { params });
    return response.data.tasks;
  },

  async getTaskById(id: string): Promise<Task> {
    const response = await api.get<{ task: Task }>(`/tasks/${id}`);
    return response.data.task;
  },

  async createTask(data: CreateTaskRequest): Promise<Task> {
    const response = await api.post<TaskResponse>("/tasks", data);
    return response.data.task;
  },

  async updateTask(id: string, data: UpdateTaskRequest): Promise<Task> {
    const response = await api.put<TaskResponse>(`/tasks/${id}`, data);
    return response.data.task;
  },

  async deleteTask(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>("/tasks/dashboard/stats");
    return response.data;
  },
};
