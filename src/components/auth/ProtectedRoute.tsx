
import { isTokenExpired, logout } from '@/services/auth.service';
import { getAuthToken } from '@/utils/auth';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const token = getAuthToken()

  useEffect(() => {
    if (!token || isTokenExpired(token)) {
        logout()
      router.push('/auth/login');
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;