import { LoginForm } from '@/features/auth/components/login-form.tsx';

export const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl mb-6"> Bienvenido a React Todo</h1>
        <LoginForm />
      </div>
    </div>
  );
};
