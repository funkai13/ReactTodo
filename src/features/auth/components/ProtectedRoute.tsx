import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { FC } from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthStore();

  if (!token) return <Navigate to="/" />;

  return <>{children}</>;
};
