
import type { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

export const useAuth = () => {
  const { user, token } = useSelector((state: RootState) => state.auth );

  return {
    user,
    token,
    isAuthenticated: !token,
    role: user?.role,
  };
};


