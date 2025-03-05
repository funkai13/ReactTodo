// edit-task.store.ts
import { create } from 'zustand';
import { Task } from '@/features/task/interfaces/Task.interface.ts';

interface EditTaskStore {
  isOpen: boolean;
  selectedTask: Task | null;
  openModal: (task: Task) => void;
  closeModal: () => void;
}

export const useEditTaskStore = create<EditTaskStore>((set) => ({
  isOpen: false,
  selectedTask: null,

  openModal: (task) => set({ isOpen: true, selectedTask: task }),
  closeModal: () => set({ isOpen: false, selectedTask: null }),
}));
