// src/routes/PrivateRoute.tsx
import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/register" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;