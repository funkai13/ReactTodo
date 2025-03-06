import { LoginForm } from '@/features/auth/components/login-form.tsx';

export const LoginPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">ReactTodo App</h1>
          <p className="text-muted-foreground mt-2">
            Inicia sesión para gestionar tus tareas
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};
