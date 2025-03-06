import { create } from 'zustand';
import { taskService } from '@/features/task/services/task.service';
import { Task } from '@/features/task/interfaces/Task.interface.ts';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  loadTasks: (page?: number) => Promise<void>;
  addTask: (task: Task) => void;
  updateTask: (id: number, data: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => void;

  setCurrentPage: (page: number) => void;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  currentPage: 1,
  totalPages: 1,
  filters: {},

  loadTasks: async (page = 1) => {
    set({ loading: true });
    try {
      const response = await taskService.getTasks(page);
      set({
        tasks: response.data,
        totalPages: response.meta.pages,
        currentPage: page,
      });
    } catch (error) {
      console.error('Error cargando tareas:', error);
    } finally {
      set({ loading: false });
    }
  },

  addTask: (task) =>
    set((state) => ({
      tasks: [task, ...state.tasks],
      currentPage: 1,
    })),

  updateTask: async (id, data) => {
    try {
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...data } : task
        ),
      }));

      const updatedTask = await taskService.updateTask(id, data);

      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      set((state) => ({ tasks: state.tasks }));
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));

      await taskService.deleteTask(id);

      if (get().tasks.length === 0 && get().currentPage > 1) {
        await get().loadTasks(get().currentPage - 1);
      }
    } catch (error) {
      set((state) => ({ tasks: state.tasks }));
      throw error;
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));
