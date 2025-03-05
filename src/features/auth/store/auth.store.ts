import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/features/auth/interfaces/authState.interface.ts';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
