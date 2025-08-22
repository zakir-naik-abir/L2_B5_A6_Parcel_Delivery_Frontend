import { Card } from '@/components/Dashboard/Card';
import React from 'react';

export const SuperAdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="System Overview">
          <p className="text-gray-600">Manage all system settings and configurations.</p>
        </Card>
        <Card title="Manage Admins">
          <p className="text-gray-600">Add, remove, or update admin accounts.</p>
        </Card>
        <Card title="Global Analytics">
          <p className="text-gray-600">View analytics for the entire platform.</p>
        </Card>
      </div>
    </div>
  );
};