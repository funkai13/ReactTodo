import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '@/features/auth/interfaces/authState.interface';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,

      setToken: (token) => set({ token }),
      setEmail: (email) => set({ email }),

      logout: () =>
        set({
          token: null,
          email: null,
        }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
