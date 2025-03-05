import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { FC } from 'react';
import { Navigate } from 'react-router';

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { token } = useAuthStore();
  /*const { validateQuery } = useValidateToken(token ?? '');*/
  console.log(token);
  if (!token) return <Navigate to="/" />;

  /* if (validateQuery.isLoading) return <p>cargando...</p>;
   
     if (validateQuery.isError) return <Navigate to="/" />;*/

  return <>{children}</>;
};
