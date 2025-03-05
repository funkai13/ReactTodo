import { apiClient } from '@/lib/apiClient.ts';
import {
  CreateTaskResponse,
  GetTaskResponse,
  Task,
  TasksResponse,
} from '@/features/task/interfaces/Task.interface.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const taskService = {
  getTasks: async (page: number = 1): Promise<TasksResponse> => {
    const response = await apiClient.get<TasksResponse>('/tasks', {
      params: { limit: 5, order: '-created_at', page },
    });
    return response.data;
  },

  updateTask: async (id: number, data: Partial<Task>): Promise<Task> => {
    try {
      await apiClient.patch(`/tasks/update/${id}`, data);

      const response = await apiClient.get<{ data: { task: Task } }>(
        `/tasks/${id}`
      );

      if (!response.data?.data?.task) {
        throw new Error('Formato de respuesta inválido');
      }

      return {
        ...response.data.data.task,
        created_at: new Date(response.data.data.task.created_at),
      };
    } catch (error) {
      throw new Error(`Error actualizando tarea: ${error}`);
    }
  },

  deleteTask: async (id: number): Promise<void> => {
    await apiClient.delete(`/tasks/delete/${id}`);
  },

  createTask: async (
    taskData: Omit<Task, 'id' | 'created_at' | 'is_completed'>
  ): Promise<Task> => {
    const email = useAuthStore.getState().email;
    if (!email) {
      throw new Error('Email is required');
    }
    const response = await apiClient.post<CreateTaskResponse>('/tasks/create', {
      ...taskData,
      user_email: email,
    });
    const newTaskId = response.data.data.id;
    const taskResponse = await apiClient.get<GetTaskResponse>(
      `/tasks/${newTaskId}`
    );
    return {
      id: taskResponse.data.data.task.id,
      title: taskResponse.data.data.task.title,
      description: taskResponse.data.data.task.description,
      is_completed: taskResponse.data.data.task.is_completed,
      created_at: new Date(taskResponse.data.data.task.created_at),
    };
  },
};
