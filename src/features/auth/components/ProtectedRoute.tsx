import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { FC } from 'react';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthStore();
  console.log(token);
  if (!token) return null;
  return <>{children}</>;
};
