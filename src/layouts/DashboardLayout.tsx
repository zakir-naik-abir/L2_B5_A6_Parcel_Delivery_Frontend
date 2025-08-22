import { Header } from '@/components/Dashboard/Header';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import React, { useState } from 'react';

interface DashboardLayoutProps{
  children: React.ReactNode;
  toggleSidebar: () => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        <Header toggleSidebar={toggleSidebar}/>
        <main className="p-8">
          {children}
        </main>
      </div>
    </div>
  );
};