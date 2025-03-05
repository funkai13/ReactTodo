import axios from 'axios';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

// Crear instancia base de Axios
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout(); // Cierra sesión si el token es inválido
      window.location.href = '/login'; // Redirige al login
    }
    return Promise.reject(error);
  }
);
