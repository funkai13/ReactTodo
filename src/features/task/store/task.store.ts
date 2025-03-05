// tasks.store.ts
import { create } from 'zustand';
import { taskService } from '../services/task.service';
import { Task } from '@/features/task/interfaces/Task.interface.ts';

interface TaskState {
  tasks: Task[];
  loadTasks: (page?: number) => Promise<void>;
  updateTask: (id: number, data: Partial<Task>) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loadTasks: async (page = 1) => {
    const response = await taskService.getTasks(page);
    set({ tasks: response.data });
  },
  updateTask: async (id, data) => {
    const updatedTask = await taskService.updateTask(id, data);
    set((state) => ({
      tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
    }));
  },
}));
