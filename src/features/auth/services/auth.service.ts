import {
  Login,
  LoginDataRequest,
  LoginResponse,
} from '@/features/auth/interfaces/LoginDataRequest.interface.ts';
import { apiClient } from '@/lib/apiClient.ts';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';

export const loginService = async (
  credentials: LoginDataRequest
): Promise<Login> => {
  try {
    const response = await apiClient.post<LoginResponse>('login', credentials);
    useAuthStore.getState().setToken(response.data.data.token);
    useAuthStore.getState().setEmail(credentials.email);
    const result = response.data.data;
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authService = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await apiClient.post('/auth/login', credentials);
    useAuthStore.getState().setToken(response.data.token); // Guarda el token en Zustand
    return response.data;
  },
  logout: () => {
    useAuthStore.getState().setToken(null);
    apiClient.defaults.headers.common.Authorization = ''; // Limpia el header
  },
};
