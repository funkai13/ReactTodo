import { create } from 'zustand';

import { taskService } from '@/features/task/services/task.service.ts';
import { Task } from '@/features/task/interfaces/Task.interface.ts';

interface EditTaskStore {
  isOpen: boolean;
  selectedTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
  handleSave: (updatedTask: Task) => Promise<void>;
  handleDelete: (taskId: number) => Promise<void>;
}

export const useEditTaskStore = create<EditTaskStore>((set) => ({
  isOpen: false,
  selectedTask: null,

  openModal: (task) => set({ isOpen: true, selectedTask: task }),
  closeModal: () => set({ isOpen: false, selectedTask: null }),

  handleSave: async (updatedTask) => {
    try {
      await taskService.updateTask(updatedTask.id, updatedTask);
    } catch (error) {
      throw error;
    }
  },

  handleDelete: async (taskId) => {
    try {
      await taskService.deleteTask(taskId);
    } catch (error) {
      throw error;
    }
  },
}));
