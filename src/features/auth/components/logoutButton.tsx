'use client';

import { Button } from '@/components/ui/button';
import { authService } from '@/features/auth/services/auth.service.ts';

export default function LogoutButton() {
  const handleLogout = () => {
    authService.logout();
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="cursor-pointer">
      Cerrar sesión
    </Button>
  );
}
