import { Card } from '@/components/Dashboard/Card';
import React from 'react';

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card title="User Management">
          <p className="text-gray-600">View and manage all users (Senders & Receivers).</p>
        </Card>
        <Card title="Content Moderation">
          <p className="text-gray-600">Review and moderate user-generated content.</p>
        </Card>
        <Card title="Reports">
          <p className="text-gray-600">Generate reports on user activity.</p>
        </Card>
      </div>
    </div>
  );
};

