import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'; 
import { useAuth } from '@/context/AuthContext';
import { authApi, useLogoutMutation } from '@/redux/features/auth/auth.api';
import { useAppDispatch } from '@/redux/hook';


interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { role } = useAuth();

  const getRoleDisplayName = (role: string) => {
    return role.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
  }

  const [logout] = useLogoutMutation();
    const dispatch = useAppDispatch();
  
    const handleLogout = async () => {
      await logout(undefined);
      dispatch(authApi.util.resetApiState());
    };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* টগল বাটন */}
        <button 
          onClick={toggleSidebar} 
          className="text-gray-500 hover:text-gray-800 focus:outline-none mr-4"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, <span className="text-blue-600">{getRoleDisplayName(role)}</span>
        </h2>
      </div>
      <div>
        <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Logout
        </button>
      </div>
    </header>
  );
};