import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import {
  ILogin,
  ILoginRespose,
  LoginDataRequest,
} from '@/features/auth/interfaces/LoginDataRequest.interface.ts';
import { loginApi } from '@/features/auth/lib/loginApi.ts';

export const loginService = async (
  credentials: LoginDataRequest
): Promise<ILogin> => {
  try {
    const response = await loginApi.post<ILoginRespose>('/login', credentials);

    const result = response.data.data;
    console.log(result);

    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const authService = {
  logout: () => {
    useAuthStore.getState().setToken(null);
  },
};
