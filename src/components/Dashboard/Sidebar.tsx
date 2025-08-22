import React from 'react';

import { HomeIcon, ChartBarIcon, Cog6ToothIcon, UsersIcon } from '@heroicons/react/24/outline';
import type { TUserRole } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const roles: TUserRole[] = ['SUPER_ADMIN', 'ADMIN', 'SENDER', 'RECEIVER'];

export const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  const { role, setRole } = useAuth();

  return (
    <div 
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <UsersIcon className={`h-8 w-8 text-blue-400 transition-transform duration-300 ${isSidebarOpen ? 'rotate-0' : 'rotate-12'}`}/>
        <h1 className={`text-2xl font-bold ml-2 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
          Dashboard
        </h1>
      </div>

      <nav className="flex-grow p-4">
        <ul>
          <li className="mb-4">
            <a href="#" className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
              <HomeIcon className="h-6 w-6" />
              <span className={`ml-4 transition-opacity ${!isSidebarOpen && 'opacity-0 hidden'}`}>Home</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
              <ChartBarIcon className="h-6 w-6" />
              <span className={`ml-4 transition-opacity ${!isSidebarOpen && 'opacity-0 hidden'}`}>Analytics</span>
            </a>
          </li>
          <li className="mb-4">
            <a href="#" className="flex items-center p-2 text-gray-300 rounded-md hover:bg-gray-700 hover:text-white">
              <Cog6ToothIcon className="h-6 w-6" />
              <span className={`ml-4 transition-opacity ${!isSidebarOpen && 'opacity-0 hidden'}`}>Settings</span>
            </a>
          </li>
        </ul>
      </nav>
      
      <div className={`p-4 border-t border-gray-700 ${!isSidebarOpen && 'px-2'}`}>
        <label 
          htmlFor="role-switcher" 
          className={`block text-sm font-medium text-gray-400 mb-2 ${!isSidebarOpen && 'hidden'}`}
        >
          Switch Role
        </label>
        <select
          id="role-switcher"
          value={role}
          onChange={(e) => setRole(e.target.value as TUserRole)}
          className={`w-full bg-gray-700 border border-gray-600 rounded-md py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${isSidebarOpen ? 'px-3' : 'px-1'}`}
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {isSidebarOpen ? r.replace('_', ' ') : r.substring(0, 1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};