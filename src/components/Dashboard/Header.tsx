import React from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline'; 
import { useUserInfoQuery } from '@/redux/features/auth/auth.api';


interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const {data} = useUserInfoQuery(undefined)
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center ">
      <div className="flex items-center">
        
        <h2 className="text-xl font-semibold text-gray-700">
          Welcome, <span className="text-blue-600">{data?.data?.name}</span>
        </h2>
      </div>
      <button 
          onClick={toggleSidebar} 
          className="text-gray-500 hover:text-gray-800 focus:outline-none mr-4"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>
      
    </header>
  );
};