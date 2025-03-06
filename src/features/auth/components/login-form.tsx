import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { loginService } from '@/features/auth/services/auth.service.ts';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import { toast } from 'sonner';
import { useAuthStore } from '@/features/auth/store/auth.store.ts';
import { Input } from '@/components/ui/input.tsx';
import { Label } from '@radix-ui/react-label';

export const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const loginDataRequest = {
      email: email,
    };
    try {
      const login = await loginService(loginDataRequest);
      setToken(login.token);
      toast.success('Inicio de Sesion Exitoso');
      navigate('/task');
    } catch (e) {
      setError(`Error al iniciar sesion ${e}`);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Iniciar Sesión</CardTitle>
        <CardDescription>Ingresa tus credenciales para acceder</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-6 mb-6">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};
