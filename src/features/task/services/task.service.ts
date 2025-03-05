import { apiClient } from '@/lib/apiClient.ts';
import {
  Task,
  TasksResponse,
} from '@/features/task/interfaces/Task.interface.ts';

export const taskService = {
  getTasks: async (page: number = 1): Promise<TasksResponse> => {
    const response = await apiClient.get<TasksResponse>('/tasks', {
      params: { limit: 20, order: '-created_at', page },
    });
    return response.data;
  },

  updateTask: async (id: number, data: Partial<Task>): Promise<Task> => {
    const response = await apiClient.patch<Task>(`/tasks/update/${id}`, data);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/delete/${id}`);
  },

  createTask: async (
    taskData: Omit<Task, 'id' | 'created_at' | 'is_completed'>
  ): Promise<Task> => {
    const response = await apiClient.post<Task>('/tasks', taskData);
    return response.data;
  },
};
