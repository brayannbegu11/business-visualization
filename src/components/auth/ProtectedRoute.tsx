
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const token = localStorage.getItem('access_token')

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;